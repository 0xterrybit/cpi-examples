import { join } from "path";
import { readFileSync } from "fs";
import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,

} from "@solana/web3.js";
import { AccountInfo, TOKEN_PROGRAM_ID, Token, } from "@solana/spl-token";
import { CpiExample } from "../target/types/cpi_example";

describe("amm-cpi-example", () => {

  const provider = anchor.AnchorProvider.env();

  anchor.setProvider(provider);

  const program = anchor.workspace.CpiExample as Program<CpiExample>;

  const OWNER_PATH = join(process.env["HOME"]!, ".config/solana/id.json");

  const OWNER = Keypair.fromSecretKey(Buffer.from(JSON.parse(readFileSync(OWNER_PATH, { encoding: "utf-8" }))));

  const SENDER = OWNER;

  // mainnet
  let mintAddress = new PublicKey('BZLbGTNCSFfoth2GYDtwr7e4imWzpR5jqcUuGEwr646K');      // mainnet io_token mint

  let token: Token = new Token(provider.connection, mintAddress, TOKEN_PROGRAM_ID, SENDER);
  let TOKEN_MINT_ADDRESS: PublicKey = token.publicKey;

  let ownerTokenAccount: AccountInfo;


  const JUP: PublicKey = new PublicKey("JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN");
  const USDC: PublicKey = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
  const CONFIG: PublicKey = new PublicKey("FiENCCbPi3rFh5pW2AJ59HC53yM32eLaCjMKxRqanKFJ");

  const USDC_USDT_POOL: PublicKey = new PublicKey("32D4zRxNc1EssbJieVHfPhZM3rH6CzfUPrWUuWxD9prG");

  before(async () => {

    // const network = provider.connection.rpcEndpoint == 'http://0.0.0.0:8899' ? 'localnet' : 'devnet';
    // console.log('network:', provider.connection.rpcEndpoint)

    if (provider.connection.rpcEndpoint == 'http://0.0.0.0:8899') {

      let ix = await provider.connection.requestAirdrop(SENDER.publicKey, 10 * LAMPORTS_PER_SOL);
      await provider.connection.confirmTransaction(ix, "confirmed");

      token = await Token.createMint(
        provider.connection,
        SENDER,
        SENDER.publicKey,
        null,
        8,
        TOKEN_PROGRAM_ID
      );
      // token.
      TOKEN_MINT_ADDRESS = token.publicKey

      // console.log('TOKEN_MINT_ADDRESS:', TOKEN_MINT_ADDRESS)

      ownerTokenAccount = await token.getOrCreateAssociatedAccountInfo(SENDER.publicKey)


      await token.mintTo(
        ownerTokenAccount.address,
        SENDER.publicKey,
        [SENDER],
        10_000_000_000_000
      );
    } else {
      
        let token: Token = new Token(provider.connection, mintAddress, TOKEN_PROGRAM_ID, OWNER);
        let TOKEN_MINT_ADDRESS: PublicKey = token.publicKey;
    }

  });

  it("swap", async () => {

    const pool_state = {
      a_vault: new PublicKey("11111111111111111111111111111111"),
      b_vault: new PublicKey("11111111111111111111111111111111"),
      a_vault_lp: new PublicKey("11111111111111111111111111111111"),
      b_vault_lp: new PublicKey("11111111111111111111111111111111"),
      protocol_token_a_fee: new PublicKey("11111111111111111111111111111111")
    };
    const a_vault_state = {
      token_vault: new PublicKey("11111111111111111111111111111111"),
      lp_mint: new PublicKey("11111111111111111111111111111111")
    };
    const b_vault_state = {
      token_vault: new PublicKey("11111111111111111111111111111111"),
      lp_mint: new PublicKey("11111111111111111111111111111111")
    };

    const user_token_a = new PublicKey("11111111111111111111111111111111");
    const user_token_b = new PublicKey("11111111111111111111111111111111");

    // await program.methods.dynamicAmmSwap(new BN(1_000_000),  new BN(0))
    //   .accounts({
    //     pool: USDC_USDT_POOL,

    //     userSourceToken: user_token_a,
    //     userDestinationToken: user_token_b,

    //     aVault: pool_state.a_vault,
    //     bVault: pool_state.b_vault,

    //     aTokenVault: a_vault_state.token_vault,
    //     bTokenVault: b_vault_state.token_vault,

    //     aVaultLpMint: a_vault_state.lp_mint,
    //     bVaultLpMint: b_vault_state.lp_mint,

    //     aVaultLp: pool_state.a_vault_lp,
    //     bVaultLp: pool_state.b_vault_lp,

    //     protocolTokenFee: pool_state.protocol_token_a_fee,
    //     user: SENDER.publicKey,

    //     vaultProgram: new PublicKey("11111111111111111111111111111111"), // 替换为实际的程序ID
    //     tokenProgram: TOKEN_PROGRAM_ID,
    //     //   dynamicAmmProgram: new PublicKey("Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB"),
    //   })
    //   .signers([
    //     SENDER
    //   ])
    //   .rpc();


  });

});
