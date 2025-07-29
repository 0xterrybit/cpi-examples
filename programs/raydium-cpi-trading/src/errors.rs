use anchor_lang::prelude::*;

#[error_code]
pub enum TradingError {
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Insufficient balance")]
    InsufficientBalance,
    #[msg("Pool not initialized")]
    PoolNotInitialized,
    #[msg("Invalid pool state")]
    InvalidPoolState,
}