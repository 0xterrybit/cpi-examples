# Raydium CPI Trading

一个完整的 Solana Anchor 项目，演示如何使用 Raydium CPI 进行代币发布、流动性管理和交易操作。

## 功能特性

- ✅ **代币创建**: 使用 SPL Token 和 Metaplex 创建自定义代币
- ✅ **AMM 池初始化**: 通过 Raydium CPI 初始化自动做市商池
- ✅ **流动性管理**: 添加和提取流动性
- ✅ **代币交换**: 支持买入和卖出操作
- ✅ **完整测试**: 包含所有功能的 TypeScript 测试

## 项目结构

```
raydium-cpi-trading/
├── programs/
│   └── raydium-cpi-trading/
│       └── src/
│           ├── lib.rs                    # 主程序入口
│           └── instructions/
│               ├── mod.rs                # 指令模块
│               ├── create_token.rs       # 代币创建
│               ├── initialize_pool.rs    # 池初始化
│               ├── deposit_liquidity.rs  # 添加流动性
│               ├── swap_base_in.rs       # 买入交换
│               ├── swap_base_out.rs      # 卖出交换
│               └── withdraw_liquidity.rs # 提取流动性
├── tests/
│   └── raydium-cpi-trading.ts          # 完整测试套件
├── Anchor.toml                          # Anchor 配置
├── Cargo.toml                           # Rust 依赖
├── package.json                         # Node.js 依赖
└── tsconfig.json                        # TypeScript 配置
```

## 依赖项

### Rust 依赖
- `anchor-lang`: Anchor 框架
- `anchor-spl`: SPL Token 集成
- `raydium-amm-cpi`: Raydium AMM CPI
- `raydium-cpmm-cpi`: Raydium CPMM CPI
- `spl-token`: SPL Token 程序
- `mpl-token-metadata`: Metaplex 代币元数据

### TypeScript 依赖
- `@coral-xyz/anchor`: Anchor 客户端
- `@solana/web3.js`: Solana Web3.js
- `@solana/spl-token`: SPL Token 客户端
- `@metaplex-foundation/mpl-token-metadata`: Metaplex 客户端
- `@raydium-io/raydium-sdk`: Raydium SDK

## 快速开始

### 1. 安装依赖

```bash
# 安装 Node.js 依赖
yarn install

# 构建程序
anchor build
```

### 2. 配置环境

确保你有：
- Solana CLI 已安装并配置
- Anchor CLI 已安装
- 足够的 SOL 用于测试（devnet）

### 3. 运行测试

```bash
# 运行完整测试套件
anchor test

# 或者只运行测试（跳过部署）
anchor test --skip-deploy
```

## 测试流程

测试套件包含以下步骤：

1. **环境设置**: 检查 SOL 余额，必要时请求空投
2. **创建代币 A**: 创建第一个测试代币（TTA）
3. **创建代币 B**: 创建第二个测试代币（TTB）
4. **初始化 AMM 池**: 通过 Raydium CPI 创建交易池
5. **添加流动性**: 向池中添加代币流动性
6. **执行买入交易**: 使用 swap_base_in 进行代币交换
7. **执行卖出交易**: 使用 swap_base_out 进行代币交换
8. **提取流动性**: 从池中提取流动性
9. **显示余额**: 展示最终的代币余额

## 重要说明

### 测试环境限制

由于测试环境中可能缺少完整的 Raydium 程序部署，某些 CPI 调用可能会失败。这是正常现象，项目主要用于演示：

- ✅ 代币创建功能完全正常
- ⚠️ Raydium CPI 操作可能在测试环境中失败
- 🚀 在 devnet 上部署时需要确保 Raydium 程序可用

### 部署到 Devnet

要在 devnet 上完整测试：

1. 确保 `Anchor.toml` 配置正确的 devnet 设置
2. 部署程序到 devnet：
   ```bash
   anchor deploy --provider.cluster devnet
   ```
3. 运行测试：
   ```bash
   anchor test --provider.cluster devnet
   ```

## 程序 ID

- **Devnet**: `9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM`
- **Raydium AMM**: `675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8`
- **Serum DEX**: `9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin`

## 交易哈希示例

运行测试时，每个操作都会输出交易哈希：

```
Token A created. Transaction signature: 2x8K9...
Token B created. Transaction signature: 3y9L0...
AMM pool initialized. Transaction signature: 4z0M1...
Liquidity deposited. Transaction signature: 5a1N2...
Token swap (buy) completed. Transaction signature: 6b2O3...
Token swap (sell) completed. Transaction signature: 7c3P4...
Liquidity withdrawn. Transaction signature: 8d4Q5...
```

## 支持的操作

### 1. 代币创建
- 创建 SPL Token
- 设置代币元数据
- 铸造初始供应量

### 2. AMM 池管理
- 初始化 Raydium AMM 池
- 配置池参数和权限

### 3. 流动性操作
- 添加流动性（存入代币对）
- 提取流动性（取回代币和 LP 代币）

### 4. 交易操作
- `swap_base_in`: 指定输入数量的交换
- `swap_base_out`: 指定输出数量的交换

## 错误处理

项目包含完善的错误处理：
- CPI 调用失败时的优雅降级
- 详细的错误信息和建议
- 测试环境的特殊处理

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License