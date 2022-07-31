
import { getTez } from "../utils/getTez";
import { tezos } from "../utils/tezos";
import { connectWallet, getAccount } from "../utils/wallet";

const ReceiveTez = () =>{

    const onReceive = async (e)=>{
        e.preventDefault();
        
        const check = await getAccount();
        if(check==""){
            console.log("te")
            await connectWallet();
            const activeAddress = await getAccount();
            
        }

        const cKey = document.getElementById('cKey').value;
        console.log(cKey);
        if(cKey==""){
            alert("Please Enter value");
            return;
        }
        await getTez(cKey);

    }
    
    return (
        <center>
        <div className="ReceiveBox">
            <h2>Enter your Contract Key below</h2>
            <form className='form'>
            <input id="cKey" type="text" placeholder="Contract Key By Sender"></input>
            <button className="send" onClick={onReceive}>Receive</button>
            </form>
        </div>
        </center>
    )
};

export default ReceiveTez;