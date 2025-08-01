use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer,Transfer};

declare_id!("FmNj7LyyDtzAxUefucyKPCdWzYB7N7igjK26zoPsxuUv");

#[program]
pub mod anchor_acc_1 {
    use super::*;

    pub fn sol_transfer(ctx: Context<SolTransfer>,amt:u64) -> Result<()> {
        let from_pubkey=ctx.accounts.sender.to_account_info();
        let to_pubkey=ctx.accounts.recipient.to_account_info();
        let program_id=ctx.accounts.system_program.to_account_info();

        let cpi_context=CpiContext::new(program_id, 
        Transfer{
            from:from_pubkey,
            to:to_pubkey
        });

        transfer(cpi_context, amt)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(mut)]
    sender:Signer<'info>,
    #[account(mut)]
    recipient:SystemAccount<'info>,
    system_program:Program<'info,System>
}
