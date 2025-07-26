# Devnet 测试代币使用指南

## 🎉 成功创建的测试代币

### 代币信息
- **代币 A (模拟 USDC)**: `A95q6pMLz9Emt8WBvjWxXLAFe38zBkcDc3ff1XZmc3o5`
- **代币 B (模拟 USDT)**: `9DtmCnat2ZqPG1bwNznmVmaizzxaBWpQ747qk9EEN2rt`

### 代币账户
- **代币 A 账户**: `ASvyuvdMX67PJAg4eU2bT21WZe9hNwX2BTPe3dKrpN8Q`
- **代币 B 账户**: `BES3jjgZNmkxoKTK8LX6mk2ShNwqETCGbRmgfn67JSvs`

### 余额
- **代币 A**: 1,000,000 USDC
- **代币 B**: 1,000,000 USDT

## 🚀 如何使用

### 1. 在测试中使用这些代币
更新你的测试文件 `tests/1_swap.test.ts`：

```typescript
// 使用创建的测试代币
const tokenAMint = new PublicKey('A95q6pMLz9Emt8WBvjWxXLAFe38zBkcDc3ff1XZmc3o5');
const tokenBMint = new PublicKey('9DtmCnat2ZqPG1bwNznmVmaizzxaBWpQ747qk9EEN2rt');
const userTokenA = new PublicKey('ASvyuvdMX67PJAg4eU2bT21WZe9hNwX2BTPe3dKrpN8Q');
const userTokenB = new PublicKey('BES3jjgZNmkxoKTK8LX6mk2ShNwqETCGbRmgfn67JSvs');
```

### 2. 检查余额
运行余额检查脚本：
```bash
npx ts-node check-balances.ts
```

### 3. 创建更多代币
如果需要更多代币，运行：
```bash
npx ts-node create-test-tokens.ts
```

## 🔧 其他获取测试币的方法

### 方法1: Solana CLI 空投 SOL
```bash
# 获取 SOL (用于交易费用)
solana airdrop 2

# 检查余额
solana balance
```

### 方法2: 使用 Solana Faucet 网站
访问: https://faucet.solana.com/
- 选择 Devnet
- 输入你的钱包地址: `A6WcyjnyU4nBD66tKxzg35bYCkeNqF4MCtQr7pwreVAv`
- 请求空投

### 方法3: 使用其他代币水龙头
一些项目提供测试代币水龙头，比如：
- USDC Devnet Faucet
- 各种 DeFi 项目的测试代币

## 📝 注意事项

1. **网络配置**: 确保你的 Solana CLI 配置指向 devnet
2. **钱包安全**: 这些是测试代币，没有真实价值
3. **余额管理**: 定期检查代币余额，必要时重新铸造
4. **交易费用**: 确保钱包中有足够的 SOL 支付交易费用

## 🔍 验证代币
你可以在 Solana Explorer 上查看这些代币：
- 访问: https://explorer.solana.com/?cluster=devnet
- 搜索代币地址或账户地址

现在你已经有了足够的测试代币来进行 devnet 上的交易测试！🎊