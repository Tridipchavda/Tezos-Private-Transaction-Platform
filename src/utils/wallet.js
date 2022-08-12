import { BeaconWallet } from "@taquito/beacon-wallet";

// Asking For Wallet and Setting up Wallet
export const wallet = new BeaconWallet({
    name:"Tez Pay",
    preferredNetwork: "jakartanet",

})

export const connectWallet = async()=>{
    await wallet.requestPermissions({network:{type:"jakartanet"}});
}

export const getAccount = async()=>{
    const account = await wallet.client.getActiveAccount();
    
    if(account){
        return account.address;
    }
    else{
        return "";
    }
}