import React, { useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { sendInstantTez } from '../utils/setInstantTez';
import { sendTez } from '../utils/setTez';
import { connectWallet, getAccount } from '../utils/wallet';


// Component for Checking QRcode With Webcam 
const QRCode = (props) => {

    // Storing Data Fetch By QR
    const [data, setData] = useState('No result');
    // Using Reference to a Input
    const myRef = useRef(null);
    // for Stopping Webcam Once QRScan is scanned
    const stopRef = useRef(null);
    // Setting Mode Contract/Instant
    const [mode, setMode] = useState("Instant");

    // Changing Mode when user wants
    const changeMode = (modeType) => {
        setMode(modeType);
    }

    // Sending Amount to Receiver checking Instant/Contract Method
    const onSend = async (e) => {
        e.preventDefault();

        const check = await getAccount();

        if (check == "") {
            await connectWallet();
            const activeAddress = await getAccount();
        }

        const rAddress = document.getElementById('rAddress').value;
        const amount = document.getElementById('Tez').value;

        // Checking Empty Data
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
        <>
            <center>
                <div className="QRContainer" ref={stopRef}>
                    
                    {data=='No result'?
                    <>
                    <h2>Scan Your QR here</h2>
                    {/* QRReader React Component to Scan QR's */}
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                setData(result?.text);
                                myRef.current.scrollIntoView();

                                let stream = stopRef.video.srcObject;
                                
                                stopRef.disconnect();
                                stopRef.current.stopCamera();
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        style={{ width: '100%' }}
                    />
                    </>
                    :
                    <h2>QR Scanned</h2>
                    }
                   
                </div>
            </center>
            <div className="outer" ref={myRef}>
                <div class="payment-type">
                    {/* Switching Between Instant Mode and Contract Mode */}
                    {mode == "Contract"
                        ?
                        <>
                            <p class="instant" onClick={() => changeMode("Instant")}>Instant Pay</p>
                            <p class="normal" onClick={() => changeMode("Contract")}>Pay</p>
                        </>
                        :
                        
                        <>
                            <p class="normal" onClick={() => changeMode("Instant")}>Instant Pay</p>
                            <p class="instant" onClick={() => changeMode("Contract")}>Pay</p>
                        </>
                    }

                </div>
                <form action="">
                    <input disabled type="text" value={data} id="rAddress" placeholder="Public Key" />
                    <input type="text" id="Tez" placeholder="Ammount (In Tez)" />
                    <button class="send_tez_button" onClick={onSend} >Send Tez</button>
                </form>

            </div>
        </>
    );
};

export default QRCode;