import { sendTez } from "../utils/setTez";
import { fetchTransaction } from "../utils/fetchTransaction";
import { tezos } from "../utils/tezos";
import { connectWallet, getAccount } from "../utils/wallet";


const SendTez = () =>{

    const onSend = async (e)=>{
        e.preventDefault();
        
        const check = await getAccount();

        if(check==""){
        
            await connectWallet();
            const activeAddress = await getAccount();
        }

        const storage = await fetchTransaction();
        // console.log(check);
        // console.log("-----")
        // console.log(storage);
        if( storage.record1[check] != undefined){
            alert("Previous Transaction in Queue");
            return;
        }
        else{
            console.log("No Pending Transaction");
        }
        const rAddress = document.getElementById('rAddress').value;
        const amount = document.getElementById('Tez').value;

        if (rAddress=="" || amount==""){
            alert("Please Enter value");
            return
        }
        await sendTez(rAddress,amount);
    }
    
    return (
        <center>
        <div className="sendBox">
            <h2>Send Tez Easily in just 15 seconds</h2>
            <form className='form'>
            <input id="rAddress" type="text" placeholder="Receiver's Address"></input>
            <input id="Tez" type="number" placeholder="Enter Amount in Tez" ></input>
            <button className="send" onClick={onSend}>Send</button>

            </form>
        </div>
        </center>
    )
};

export default SendTez;