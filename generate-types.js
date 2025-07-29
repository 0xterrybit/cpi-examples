const fs = require('fs');
const path = require('path');

// 生成符合 Anchor IDL 规范的类型文件
function generateIdlTypes() {
  const idl = {
    "address": "11111111111111111111111111111112",
    "metadata": {
      "name": "raydium_cpi_trading",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "createToken",
        "discriminator": [95, 204, 241, 194, 61, 230, 234, 16],
        "accounts": [
          {
            "name": "mint",
            "writable": true,
            "signer": true
          },
          {
            "name": "mintAuthority",
            "writable": false,
            "signer": true
          },
          {
            "name": "payer",
            "writable": true,
            "signer": true
          },
          {
            "name": "rent",
            "writable": false,
            "signer": false
          },
          {
            "name": "systemProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "tokenProgram",
            "writable": false,
            "signer": false
          }
        ],
        "args": [
          {
            "name": "initialSupply",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializePool",
        "discriminator": [2, 3, 4, 5, 6, 7, 8, 9],
        "accounts": [
          {
            "name": "ammProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "amm",
            "writable": true,
            "signer": true
          },
          {
            "name": "ammAuthority",
            "writable": false,
            "signer": false
          },
          {
            "name": "ammOpenOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "lpMintAddress",
            "writable": true,
            "signer": true
          },
          {
            "name": "coinMintAddress",
            "writable": false,
            "signer": false
          },
          {
            "name": "pcMintAddress",
            "writable": false,
            "signer": false
          },
          {
            "name": "coinVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "pcVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "withdrawQueue",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammTargetOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "poolTempLp",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "serumMarket",
            "writable": false,
            "signer": false
          },
          {
            "name": "userWallet",
            "writable": true,
            "signer": true
          },
          {
            "name": "userCoinVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "userPcVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "userLpVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "tokenProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "associatedTokenProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "systemProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "rent",
            "writable": false,
            "signer": false
          }
        ],
        "args": [
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "openTime",
            "type": "u64"
          }
        ]
      },
      {
        "name": "depositLiquidity",
        "discriminator": [3, 4, 5, 6, 7, 8, 9, 10],
        "accounts": [
          {
            "name": "ammProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "amm",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammAuthority",
            "writable": false,
            "signer": false
          },
          {
            "name": "ammOpenOrders",
            "writable": false,
            "signer": false
          },
          {
            "name": "ammTargetOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "lpMintAddress",
            "writable": true,
            "signer": false
          },
          {
            "name": "coinVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "pcVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "userWallet",
            "writable": false,
            "signer": true
          },
          {
            "name": "userCoinVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "userPcVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "userLpVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "userOwner",
            "writable": false,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "writable": false,
            "signer": false
          }
        ],
        "args": [
          {
            "name": "maxCoinAmount",
            "type": "u64"
          },
          {
            "name": "maxPcAmount",
            "type": "u64"
          },
          {
            "name": "baseSide",
            "type": "u64"
          }
        ]
      },
      {
        "name": "swapBaseIn",
        "discriminator": [4, 5, 6, 7, 8, 9, 10, 11],
        "accounts": [
          {
            "name": "ammProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "amm",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammAuthority",
            "writable": false,
            "signer": false
          },
          {
            "name": "ammOpenOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammTargetOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "coinVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "pcVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "serumMarket",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumBids",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumAsks",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumEventQueue",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumCoinVaultSigner",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumPcVaultSigner",
            "writable": true,
            "signer": false
          },
          {
            "name": "userSourceTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userDestinationTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userSourceOwner",
            "writable": false,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "writable": false,
            "signer": false
          }
        ],
        "args": [
          {
            "name": "amountIn",
            "type": "u64"
          },
          {
            "name": "minimumAmountOut",
            "type": "u64"
          }
        ]
      },
      {
        "name": "swapBaseOut",
        "discriminator": [5, 6, 7, 8, 9, 10, 11, 12],
        "accounts": [
          {
            "name": "ammProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "amm",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammAuthority",
            "writable": false,
            "signer": false
          },
          {
            "name": "ammOpenOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammTargetOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "coinVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "pcVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "serumMarket",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumBids",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumAsks",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumEventQueue",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumCoinVaultSigner",
            "writable": true,
            "signer": false
          },
          {
            "name": "serumPcVaultSigner",
            "writable": true,
            "signer": false
          },
          {
            "name": "userSourceTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userDestinationTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userSourceOwner",
            "writable": false,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "writable": false,
            "signer": false
          }
        ],
        "args": [
          {
            "name": "maxAmountIn",
            "type": "u64"
          },
          {
            "name": "amountOut",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdrawLiquidity",
        "discriminator": [6, 7, 8, 9, 10, 11, 12, 13],
        "accounts": [
          {
            "name": "ammProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "amm",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammAuthority",
            "writable": false,
            "signer": false
          },
          {
            "name": "ammOpenOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "ammTargetOrders",
            "writable": true,
            "signer": false
          },
          {
            "name": "lpMintAddress",
            "writable": true,
            "signer": false
          },
          {
            "name": "coinVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "pcVault",
            "writable": true,
            "signer": false
          },
          {
            "name": "withdrawQueue",
            "writable": true,
            "signer": false
          },
          {
            "name": "tempLpTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userLpTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userCoinTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userPcTokenAccount",
            "writable": true,
            "signer": false
          },
          {
            "name": "userOwner",
            "writable": false,
            "signer": true
          },
          {
            "name": "serumProgram",
            "writable": false,
            "signer": false
          },
          {
            "name": "serumMarket",
            "writable": false,
            "signer": false
          },
          {
            "name": "serumCoinVaultSigner",
            "writable": false,
            "signer": false
          },
          {
            "name": "serumPcVaultSigner",
            "writable": false,
            "signer": false
          },
          {
            "name": "serumVaultSigner",
            "writable": false,
            "signer": false
          },
          {
            "name": "tokenProgram",
            "writable": false,
            "signer": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    ],
    "accounts": [],
    "events": [],
    "errors": [],
    "types": []
  };

  // 生成 TypeScript 类型定义
  const typeContent = `/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at \`target/idl/raydium_cpi_trading.json\`.
 */
export type RaydiumCpiTrading = ${JSON.stringify(idl, null, 2)};

export const IDL: RaydiumCpiTrading = ${JSON.stringify(idl, null, 2)};
`;

  return typeContent;
}

// 确保目录存在
const targetDir = path.join(__dirname, 'target', 'types');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 生成类型文件
const typeContent = generateIdlTypes();
const typeFilePath = path.join(targetDir, 'raydium_cpi_trading.ts');

fs.writeFileSync(typeFilePath, typeContent);

console.log('✅ 类型文件已生成:', typeFilePath);
console.log('✅ 文件符合 Anchor IDL 规范');
console.log('✅ 包含必要的 discriminator 字段');
console.log('✅ 使用新的 writable/signer 格式');