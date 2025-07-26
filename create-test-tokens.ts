import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  SystemProgram,
} from '@solana/web3.js';
import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { readFileSync } from 'fs';
import { join } from 'path';

async function createTestTokens() {
  // 连接到 devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  
  // 加载钱包
  const OWNER_PATH = join(process.env["HOME"]!, ".config/solana/attestation_admin_test.json");
  const ownerKeypair = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(readFileSync(OWNER_PATH, { encoding: "utf-8" })))
  );
  
  console.log('钱包地址:', ownerKeypair.publicKey.toString());
  
  // 检查余额
  const balance = await connection.getBalance(ownerKeypair.publicKey);
  console.log('SOL 余额:', balance / 1e9, 'SOL');
  
  if (balance < 0.1 * 1e9) {
    console.log('余额不足，请先获取 SOL 空投');
    return;
  }
  
  try {
    // 创建测试代币 A (模拟 USDC)
    console.log('正在创建测试代币 A (USDC)...');
    const tokenA = await Token.createMint(
      connection,
      ownerKeypair,
      ownerKeypair.publicKey,
      null,
      6, // USDC 有 6 位小数
      TOKEN_PROGRAM_ID
    );
    console.log('代币 A 地址:', tokenA.publicKey.toString());
    
    // 创建测试代币 B (模拟 USDT)
    console.log('正在创建测试代币 B (USDT)...');
    const tokenB = await Token.createMint(
      connection,
      ownerKeypair,
      ownerKeypair.publicKey,
      null,
      6, // USDT 有 6 位小数
      TOKEN_PROGRAM_ID
    );
    console.log('代币 B 地址:', tokenB.publicKey.toString());
    
    // 为用户创建代币账户并铸造代币
    console.log('正在创建代币账户...');
    
    // 代币 A 账户
    const tokenAAccount = await tokenA.getOrCreateAssociatedAccountInfo(
      ownerKeypair.publicKey
    );
    console.log('代币 A 账户地址:', tokenAAccount.address.toString());
    
    // 代币 B 账户
    const tokenBAccount = await tokenB.getOrCreateAssociatedAccountInfo(
      ownerKeypair.publicKey
    );
    console.log('代币 B 账户地址:', tokenBAccount.address.toString());
    
    // 铸造代币 A (1,000,000 USDC)
    console.log('正在铸造代币 A...');
    await tokenA.mintTo(
      tokenAAccount.address,
      ownerKeypair.publicKey,
      [ownerKeypair],
      1_000_000 * 1e6 // 1,000,000 USDC
    );
    
    // 铸造代币 B (1,000,000 USDT)
    console.log('正在铸造代币 B...');
    await tokenB.mintTo(
      tokenBAccount.address,
      ownerKeypair.publicKey,
      [ownerKeypair],
      1_000_000 * 1e6 // 1,000,000 USDT
    );
    
    console.log('\n✅ 测试代币创建成功！');
    console.log('='.repeat(50));
    console.log('代币 A (USDC) 地址:', tokenA.publicKey.toString());
    console.log('代币 B (USDT) 地址:', tokenB.publicKey.toString());
    console.log('代币 A 账户地址:', tokenAAccount.address.toString());
    console.log('代币 B 账户地址:', tokenBAccount.address.toString());
    console.log('='.repeat(50));
    
    // 保存到配置文件
    const config = {
      tokenA: {
        mint: tokenA.publicKey.toString(),
        account: tokenAAccount.address.toString(),
      },
      tokenB: {
        mint: tokenB.publicKey.toString(),
        account: tokenBAccount.address.toString(),
      },
      owner: ownerKeypair.publicKey.toString(),
    };
    
    require('fs').writeFileSync(
      './devnet-tokens.json',
      JSON.stringify(config, null, 2)
    );
    
    console.log('配置已保存到 devnet-tokens.json');
    
  } catch (error) {
    console.error('创建代币时出错:', error);
  }
}

// 运行脚本
createTestTokens().catch(console.error);