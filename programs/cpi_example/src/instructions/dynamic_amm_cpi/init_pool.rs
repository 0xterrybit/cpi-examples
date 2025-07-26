use crate::dynamic_amm;
use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount, Transfer as TokenTransfer},
};

use anchor_lang::system_program::Transfer as NativeSolTransfer;

pub const POOL_SIZE: usize = 8 + 944;

#[derive(Accounts)]
pub struct InitializePoolCtx<'info> {
    /// CHECK: Pool account (PDA)
    #[account(mut)]
    pub pool: UncheckedAccount<'info>,

    /// CHECK: Config account
    pub config: UncheckedAccount<'info>,

    /// CHECK: LP token mint of the pool
    #[account(mut)]
    pub lp_mint: UncheckedAccount<'info>,

    /// CHECK: Token A mint of the pool. Eg: USDT
    pub token_a_mint: UncheckedAccount<'info>,

    /// CHECK: Token B mint of the pool. Eg: USDC
    pub token_b_mint: UncheckedAccount<'info>,

    /// CHECK: Vault account for token A. Token A of the pool will be deposit / withdraw from this vault account.
    #[account(mut)]
    pub a_vault: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Vault account for token B. Token B of the pool will be deposit / withdraw from this vault account.
    pub b_vault: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Token vault account of vault A
    pub a_token_vault: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Token vault account of vault B
    pub b_token_vault: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: LP token mint of vault A
    pub a_vault_lp_mint: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: LP token mint of vault B
    pub b_vault_lp_mint: UncheckedAccount<'info>,

    /// CHECK: LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault.
    #[account(mut)]
    pub a_vault_lp: UncheckedAccount<'info>,

    /// CHECK: LP token account of vault B. Used to receive/burn vault LP upon deposit/withdraw from the vault.
    #[account(mut)]
    pub b_vault_lp: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Payer token account for pool token A mint. Used to bootstrap the pool with initial liquidity.
    pub payer_token_a: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Admin token account for pool token B mint. Used to bootstrap the pool with initial liquidity.
    pub payer_token_b: UncheckedAccount<'info>,

    /// CHECK: Payer pool LP token account. Used to receive LP during first deposit (initialize pool)
    #[account(mut)]
    pub payer_pool_lp: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: Protocol fee token account for token A. Used to receive trading fee.
    pub protocol_token_a_fee: UncheckedAccount<'info>,

    /// CHECK: Protocol fee token account for token B. Used to receive trading fee.
    #[account(mut)]
    pub protocol_token_b_fee: UncheckedAccount<'info>,

    /// CHECK: Payer account. This account will be the creator of the pool, and the payer for PDA during initialize pool.
    #[account(mut)]
    pub payer: Signer<'info>,

    /// Rent account.
    pub rent: Sysvar<'info, Rent>,

    /// CHECK: LP mint metadata PDA. Metaplex do the checking.
    #[account(mut)]
    pub mint_metadata: UncheckedAccount<'info>,

    /// CHECK: Metadata program
    pub metadata_program: UncheckedAccount<'info>,

    /// CHECK: Vault program. The pool will deposit/withdraw liquidity from the vault.
    pub vault_program: UncheckedAccount<'info>,
    /// CHECK: Token program.
    pub token_program: UncheckedAccount<'info>,
    /// CHECK: Associated token program.
    pub associated_token_program: UncheckedAccount<'info>,
    /// CHECK: System program.
    pub system_program: UncheckedAccount<'info>,

    /// CHECK: Dynamic AMM program
    #[account(address = dynamic_amm::ID)]
    pub dynamic_amm_program: UncheckedAccount<'info>,
}


/// Executes a Dynamic AMM initialize customizable constant product permissionless pool
///
/// # Arguments
///
/// * `ctx` - The context containing accounts and programs.
/// * `token_a_amount` - The amount of token a to be deposited.
/// * `token_b_amount` - The amount of token b to be deposited.
/// * `activation_point - When the pool start trade.
///
/// # Returns
///
/// Returns a `Result` indicating success or failure.
pub fn handle_init_pool(
    ctx: Context<InitializePoolCtx>,
    token_a_amount: u64,
    token_b_amount: u64,
    activation_point: Option<u64>,
) -> Result<()> {
    let accounts =
        dynamic_amm::cpi::accounts::InitializePermissionlessConstantProductPoolWithConfig2 {
            pool: ctx.accounts.pool.to_account_info(),
            token_a_mint: ctx.accounts.token_a_mint.to_account_info(),
            token_b_mint: ctx.accounts.token_b_mint.to_account_info(),
            a_vault: ctx.accounts.a_vault.to_account_info(),
            b_vault: ctx.accounts.b_vault.to_account_info(),
            a_token_vault: ctx.accounts.a_token_vault.to_account_info(),
            b_token_vault: ctx.accounts.b_token_vault.to_account_info(),
            a_vault_lp_mint: ctx.accounts.a_vault_lp_mint.to_account_info(),
            b_vault_lp_mint: ctx.accounts.b_vault_lp_mint.to_account_info(),
            a_vault_lp: ctx.accounts.a_vault_lp.to_account_info(),
            b_vault_lp: ctx.accounts.b_vault_lp.to_account_info(),
            payer_token_a: ctx.accounts.payer_token_a.to_account_info(),
            payer_token_b: ctx.accounts.payer_token_b.to_account_info(),
            payer_pool_lp: ctx.accounts.payer_pool_lp.to_account_info(),
            protocol_token_a_fee: ctx.accounts.protocol_token_a_fee.to_account_info(),
            protocol_token_b_fee: ctx.accounts.protocol_token_b_fee.to_account_info(),
            payer: ctx.accounts.payer.to_account_info(),
            rent: ctx.accounts.rent.to_account_info(),
            mint_metadata: ctx.accounts.mint_metadata.to_account_info(),
            metadata_program: ctx.accounts.metadata_program.to_account_info(),
            vault_program: ctx.accounts.vault_program.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
            associated_token_program: ctx.accounts.associated_token_program.to_account_info(),
            lp_mint: ctx.accounts.lp_mint.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            config: ctx.accounts.config.to_account_info(),
        };

    let cpi_context = CpiContext::new(ctx.accounts.dynamic_amm_program.to_account_info(), accounts);

    dynamic_amm::cpi::initialize_permissionless_constant_product_pool_with_config2(
        cpi_context,
        token_a_amount,
        token_b_amount,
        activation_point,
    )
    
}