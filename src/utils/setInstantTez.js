
import { tezos } from "./tezos";
import { connectWallet,getAccount } from "./wallet";

export const sendInstantTez = async (address,tez)=>{
    
    const instantPay = "KT1FeYjzBiuMTDZKcG2TkHCoYnDB7h8PvG3H";
    
    const check = await getAccount();
    
    if(check==""){
        await connectWallet();
        const activeAddress = await getAccount();
    }

    const contract = await tezos.wallet.at(instantPay);
    console.log(contract);
    const op = await contract.methods.default(address).send({
        amount: tez,
        mutez:false,
    });
    await op.confirmation(1);

    console.log(address,tez);
    
}