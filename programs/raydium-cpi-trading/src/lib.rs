use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;

declare_id!("545J1sBmrnPKXZgAgK8yB2uB7a8hVZo83Es9V8zSo4w");

#[program]
pub mod raydium_cpi_trading {
    use super::*;

    /// 创建新代币
    pub fn create_token(
        ctx: Context<CreateToken>,
        initial_supply: u64,
    ) -> Result<()> {
        create_token::handler(ctx, initial_supply)
    }

    /// 初始化 Raydium AMM 池
    pub fn initialize_pool(
        ctx: Context<InitializePool>,
        nonce: u8,
        open_time: u64,
    ) -> Result<()> {
        initialize_pool::handler(ctx, nonce, open_time)
    }

    /// 向池中添加流动性
    pub fn deposit_liquidity(
        ctx: Context<DepositLiquidity>,
        max_coin_amount: u64,
        max_pc_amount: u64,
        base_side: u64,
    ) -> Result<()> {
        deposit_liquidity::handler(ctx, max_coin_amount, max_pc_amount, base_side)
    }

    /// 交换代币 (买入)
    pub fn swap_base_in(
        ctx: Context<SwapBaseIn>,
        amount_in: u64,
        minimum_amount_out: u64,
    ) -> Result<()> {
        swap_base_in::handler(ctx, amount_in, minimum_amount_out)
    }

    /// 交换代币 (卖出)
    pub fn swap_base_out(
        ctx: Context<SwapBaseOut>,
        max_amount_in: u64,
        amount_out: u64,
    ) -> Result<()> {
        swap_base_out::handler(ctx, max_amount_in, amount_out)
    }

    /// 提取流动性
    pub fn withdraw_liquidity(
        ctx: Context<WithdrawLiquidity>,
        amount: u64,
    ) -> Result<()> {
        withdraw_liquidity::handler(ctx, amount)
    }
}
