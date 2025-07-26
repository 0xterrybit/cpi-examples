// https://github.com/coral-xyz/anchor/issues/3401#issuecomment-2513466441
#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;

pub mod instructions;
pub use instructions::*;

declare_program!(dynamic_amm);
declare_program!(dynamic_vault);

use crate::dynamic_amm_swap::*;

fn assert_eq_admin(_key: Pubkey) -> bool {
    true
}

declare_id!("4JTNRRQpgLusbEhGnzTuE9kgPgMLXQX1wqBzU52GduqH");

#[program]
pub mod cpi_example {
    use super::*;

    pub fn init_pool(
        ctx: Context<InitializePoolCtx>,
        token_a_amount: u64,
        token_b_amount: u64,
        activation_point: Option<u64>,
    ) -> Result<()> {
        instructions::dynamic_amm_cpi::init_pool::handle_init_pool(
            ctx,
            token_a_amount,
            token_b_amount,
            activation_point,
        )
    }
 
    pub fn dynamic_amm_swap(
        ctx: Context<DynamicAmmSwap>,
        amount_in: u64,
        min_amount_out: u64,
    ) -> Result<()> {
        instructions::dynamic_amm_cpi::dynamic_amm_swap::handle_dynamic_amm_swap(
            ctx,
            amount_in,
            min_amount_out,
        )
    }

    pub fn lock_lp(
        ctx: Context<LockLiquidity>,
        allocations: [u16; 2],
    ) -> Result<()> {
        instructions::dynamic_amm_cpi::lock_liquidity::handle_lock_liquidity(ctx, allocations)
    }

}
