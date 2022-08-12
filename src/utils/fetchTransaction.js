import axios from "axios";

// Fetch Data of Transaction Available in Contract
export const fetchTransaction = async ()=>{
    try{
        
        const res = await axios.get("https://api.jakartanet.tzkt.io/v1/contracts/KT1NwBTADHU1XYsiEXMAgGsKYTNTaRdSoKWg/storage/");
        return res.data;
        
    }
    catch(err){
        throw err;
    }
}