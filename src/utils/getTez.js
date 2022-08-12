import { tezos } from "./tezos";

// Connect to receiveTez function of contract

export const getTez = async (cKey)=>{
    
    // const trail = "KT1UrdXi1Mx7wJxvcuANu3gERN9xP5H2AxW3";
    // const mark_2 = "KT1JvzCu4Lv29XgknCASLGghrousxQcjp3sy";
    // const mark_3 = "KT1TonohtFcTSb7d2roDFtSn4cNkvWaLc7kr";
    // const mark_4 = "KT1JisCVeLfktW973LTKXs96ukGGMf2C1Uww";
    const mark_5 = "KT1NwBTADHU1XYsiEXMAgGsKYTNTaRdSoKWg";

    const contract = await tezos.wallet.at(mark_5);
    
    const op = await contract.methods.receiveTez(cKey).send();

    await op.confirmation(1);
    
}