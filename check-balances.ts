import { Connection, PublicKey } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { readFileSync } from 'fs';

async function checkTokenBalances() {
  // 连接到 devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  
  // 读取配置文件
  const config = JSON.parse(readFileSync('./devnet-tokens.json', 'utf-8'));
  
  console.log('🔍 检查代币余额...\n');
  
  try {
    // 检查代币 A 余额
    const tokenA = new Token(
      connection,
      new PublicKey(config.tokenA.mint),
      TOKEN_PROGRAM_ID,
      null as any
    );
    
    const tokenABalance = await tokenA.getAccountInfo(new PublicKey(config.tokenA.account));
    console.log(`代币 A (USDC) 余额: ${tokenABalance.amount.toNumber() / 1e6} USDC`);
    
    // 检查代币 B 余额
    const tokenB = new Token(
      connection,
      new PublicKey(config.tokenB.mint),
      TOKEN_PROGRAM_ID,
      null as any
    );
    
    const tokenBBalance = await tokenB.getAccountInfo(new PublicKey(config.tokenB.account));
    console.log(`代币 B (USDT) 余额: ${tokenBBalance.amount.toNumber() / 1e6} USDT`);
    
    console.log('\n✅ 代币余额检查完成！');
    console.log('\n📋 代币信息:');
    console.log(`代币 A 地址: ${config.tokenA.mint}`);
    console.log(`代币 B 地址: ${config.tokenB.mint}`);
    console.log(`代币 A 账户: ${config.tokenA.account}`);
    console.log(`代币 B 账户: ${config.tokenB.account}`);
    
  } catch (error) {
    console.error('检查余额时出错:', error);
  }
}

checkTokenBalances().catch(console.error);
