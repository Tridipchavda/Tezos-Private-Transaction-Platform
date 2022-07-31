import axios from "axios";

export const fetchTransaction = async ()=>{
    try{
        
        const res = await axios.get("https://api.jakartanet.tzkt.io/v1/contracts/KT1JisCVeLfktW973LTKXs96ukGGMf2C1Uww/storage/");

        return res.data;
        
    }
    catch(err){
        throw err;
        
    }
}