import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorAcc1 } from "../target/types/anchor_acc_1";
import { assert } from "chai";

describe("anchor_acc_1", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider=anchor.getProvider();  
  const recipient=anchor.web3.Keypair.generate();
  const program = anchor.workspace.anchorAcc1 as Program<AnchorAcc1>;


  it("Is initialized!", async () => {

    let provider_balance = await provider.connection.getBalance(provider.publicKey);
    console.log("💰 Sender balance before transfer:", provider_balance);
    
    const tx = await program.methods.solTransfer(new anchor.BN(1000000000))
    .accounts({
      sender:provider.publicKey,
      recipient:recipient.publicKey
    })
    .rpc();
    console.log("Your transaction signature", tx);

    provider_balance = await provider.connection.getBalance(provider.publicKey);
    console.log("💰 Sender balance after transfer:", provider_balance);
    const acc =await provider.connection.getAccountInfo(recipient.publicKey);
    assert.equal(acc?.lamports,1000000000);
  });
});
