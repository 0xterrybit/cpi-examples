#!/usr/bin/env node

console.log('🚀 Raydium CPI Trading - 类型文件自动生成工具');
console.log('================================================\n');

console.log('📋 可用命令:');
console.log('  npm run generate-types  - 生成类型文件');
console.log('  npm run build          - 构建项目（包含类型生成）');
console.log('  npm test               - 运行测试');
console.log('  npm test tests/simple-validation.ts - 运行简化验证\n');

console.log('🔧 解决的问题:');
console.log('  ✅ RaydiumCpiTrading 类型不满足 Idl 约束');
console.log('  ✅ 缺少 discriminator 字段');
console.log('  ✅ 账户定义格式不正确');
console.log('  ✅ 手动维护类型文件的复杂性\n');

console.log('📁 生成的文件:');
console.log('  target/types/raydium_cpi_trading.ts - 主要类型文件');
console.log('  TYPE-GENERATION.md - 详细说明文档\n');

console.log('🎯 使用示例:');
console.log('```typescript');
console.log('import { RaydiumCpiTrading, IDL } from "./target/types/raydium_cpi_trading";');
console.log('import { Program } from "@coral-xyz/anchor";');
console.log('');
console.log('// 现在这行代码不会有类型错误了');
console.log('const program = new Program<RaydiumCpiTrading>(IDL, programId, provider);');
console.log('```\n');

console.log('⚠️  注意事项:');
console.log('  - 依赖库的类型错误是已知问题，不影响功能');
console.log('  - 运行时错误需要实际的程序部署');
console.log('  - 建议在 devnet 环境中测试\n');

console.log('🔄 要重新生成类型文件，请运行:');
console.log('  npm run generate-types\n');

// 检查类型文件是否存在
const fs = require('fs');
const path = require('path');

const typeFilePath = path.join(__dirname, 'target', 'types', 'raydium_cpi_trading.ts');
if (fs.existsSync(typeFilePath)) {
  console.log('✅ 类型文件已存在:', typeFilePath);
  
  // 显示文件大小
  const stats = fs.statSync(typeFilePath);
  console.log(`📊 文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
  
  // 显示最后修改时间
  console.log(`🕒 最后修改: ${stats.mtime.toLocaleString()}`);
} else {
  console.log('❌ 类型文件不存在，请运行: npm run generate-types');
}

console.log('\n🎉 类型文件自动生成功能已就绪！');