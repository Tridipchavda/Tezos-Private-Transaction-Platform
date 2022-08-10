import { sendTez } from "../utils/setTez";
import { sendInstantTez } from "../utils/setInstantTez";
import { fetchTransaction } from "../utils/fetchTransaction";
import { tezos } from "../utils/tezos";
import { connectWallet, getAccount } from "../utils/wallet";
import { useState } from "react";


const SendTez = () => {

    const [mode, setMode] = useState("Instant");

    const changeMode = (modeType) => {
        setMode(modeType);
        alert(modeType);
    }
    const onSend = async (e) => {
        e.preventDefault();

        const check = await getAccount();

        if (check == "") {

            await connectWallet();
            const activeAddress = await getAccount();
        }

        const storage = await fetchTransaction();
        console.log(check);
        console.log("-----")
        console.log(storage);

        const rAddress = document.getElementById('rAddress').value;
        const amount = document.getElementById('Tez').value;

        if (rAddress == "" || amount == "") {
            alert("Please Enter value");
            return
        }
        if(mode=="Contract"){
            await sendTez(rAddress, amount);
        }
        else{
            await sendInstantTez(rAddress, amount)
            alert("No Instant Mode Available")
        }
    }

    return (
        // <center>
        // <div className="sendBox">
        //     <h2>Send Tez Easily in just 15 seconds</h2>
        //     <form className='form'>
        //     <input id="rAddress" type="text" placeholder="Receiver's Address"></input>
        //     <input id="Tez" type="number" placeholder="Enter Amount in Tez" ></input>
        //     <button className="send" onClick={onSend}>Send</button>

        //     </form>
        // </div>
        // </center>
        <>

            <div class="outer">

                <div class="payment-type">
                    {mode == "Contract"
                        ?
                        <>
                            <p class="normal" onClick={() => changeMode("Instant")}>Instant Pay</p>
                            <p class="instant" onClick={() => changeMode("Contract")}>Pay</p>
                        </>
                        :

                        <>
                            <p class="instant" onClick={() => changeMode("Instant")}>Instant Pay</p>
                            <p class="normal" onClick={() => changeMode("Contract")}>Pay</p>
                        </>
                    }

                </div>
                <form action="">
                    <input type="text" name="" id="" placeholder="User Name" />
                    <input type="text" name="" id="rAddress" placeholder="Public Key" />
                    <input type="text" name="" id="Tez" placeholder="Ammount (In Tez)" />
                    <button class="send_tez_button" onClick={onSend} >Send Tez</button>
                </form>

            </div>
        </>
    )
};

export default SendTez;