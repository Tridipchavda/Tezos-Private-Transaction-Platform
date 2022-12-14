import { Link } from "react-router-dom";
import QRCode from "qrcode";
import { getAccount } from "../utils/wallet";
import { useState,useEffect } from "react";

// Menu Component giving options for Sending, Receiveing, QRcode, Contacts etc.
const Menu = () =>{

    // Use to Set QRcode url for Image Tag
    const [url,setUrl] = useState("");

    // Making QRcode while loading the website
    useEffect(()=>{
        (async ()=>{
            const activeAccount = await getAccount();

            if(activeAccount !=""){
                const response = await QRCode.toDataURL(activeAccount);
                setUrl(response);
            }
        })();
    });

    return (
    <>
    <div className="center_div01">
        <div className="QR_div">
            <div className="QR_final">
                <img src={url} >
                </img>
                <Link to="/QRcode"><p>scan QR to pay tez</p></Link>
            </div>
        </div>
        <div className="button_pay_accept">
            <div className="temp_line">
            </div>
            <div className="button_div_final">
                <div className="button_div_final01">
                    <Link to="/send">
                        <button className="common_button">
                            <span className="sp01"><img src="https://i.ibb.co/QjMSGkL/send01.png"/></span>
                        <p>send tez</p>
                        </button>
                    </Link>
                    <Link to="/receive">
                        <button className="common_button">
                            <span className="sp01"><img src="https://www.linkpicture.com/q/recieve01.png"/>
                            </span>
                        <p>recieve tez</p>
                        </button>
                    </Link>
                    <Link to="/contact">
                        <button className="common_button">
                            <span className="sp01"><img src="https://i.ibb.co/nRL0M0f/contacts.png"/></span>
                        <p>add to contact</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Menu;