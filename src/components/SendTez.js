import { sendTez } from "../utils/setTez";
import { sendInstantTez } from "../utils/setInstantTez";
import { fetchTransaction } from "../utils/fetchTransaction";
import { connectWallet, getAccount } from "../utils/wallet";
import { useEffect, useRef, useState } from "react";

// A Component to send Tez with Two Modes
const SendTez = () => {

    // Store current Type of Payment
    const [mode, setMode] = useState("Instant");
    // Used for avaiabling Input Field also for typing Direct Public Key
    const [change, setChange] = useState(0);
    // Store address from contacts and put in "rAddress" Field
    const [adress, setAddress] = useState("");

    // Refrencing a Input Fiels
    const myRef = useRef(null);

    //Changing Modes
    const changeMode = (modeType) => {
        setMode(modeType);
        alert(modeType);
    }

    // Fetching Data of contacts while Loading website
    let resp = "";
    useEffect(() => {
        (async () => {
            const activeAccount = await getAccount();
            if (activeAccount != "") {
                const data = await fetch(`https://contacts-7f66a-default-rtdb.firebaseio.com/${activeAccount}.json`);
                resp = await data.json();
            }
        })();
    });

    // Changing Value of Address by Detecting Name Avaiable in Contact
    const changeVal = async (event) => {
        setChange(0);
        let val = event.target.value;

        if (val == "") {
            setAddress("");
        }

        let storage = "";
        for (let key in resp) {

            const name = resp[key].Cname;
            const address = resp[key].Caddress;

            if (val == name) {
                console.log(name);

                setChange(1);
                setAddress(address);
                storage = address;
            }
        }
    }

    // Sending Tez as per Mode requirement
    const onSend = async (e) => {
        e.preventDefault();

        const check = await getAccount();

        if (check == "") {
            await connectWallet();
            const activeAddress = await getAccount();
        }

        const storage = await fetchTransaction();
        // console.log(check);
        // console.log("-----")
        // console.log(storage);

        const rAddress = document.getElementById('rAddress').value;
        const amount = document.getElementById('Tez').value;

        if (rAddress == "" || amount == "") {
            alert("Please Enter value");
            return;
        }
        if (mode == "Contract") {
            await sendTez(rAddress, amount);
        }
        else {
            await sendInstantTez(rAddress, amount);
        }
    }

    return (
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
                <input type="text" onKeyUp={changeVal} id="receiverName" placeholder="User Name" />
                {
                    /* For Making Free the Input Addres Field when Required */
                    change == 1
                        ? <input type="text" ref={myRef} name="" id="rAddress" value={adress} placeholder="Public Key" />
                        : <input type="text" ref={myRef} name="" id="rAddress" placeholder="Public Key" />
                }

                <input type="text" name="" id="Tez" placeholder="Ammount (In Tez)" />
                <button class="send_tez_button" onClick={onSend} >Send Tez</button>
            </form>
        </div>
    )
};

export default SendTez;