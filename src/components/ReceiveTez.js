import { getTez } from "../utils/getTez";
import { connectWallet, getAccount } from "../utils/wallet";

// Component For Receiving Tez by Providing Contract Key
const ReceiveTez = () => {
    // Function to connect to Contract for Receiving Amount
    const onReceive = async (e) => {
        e.preventDefault();

        const check = await getAccount();
        if (check == "") {
            console.log("No Wallet Found");
            await connectWallet();
            await getAccount();
        }
        const cKey = document.getElementById('cKey').value;
        console.log(cKey);
        if (cKey == "") {
            alert("Please Enter value");
            return;
        }
        await getTez(cKey);
    }

    return (
        <div class="outer">
            <p class="payment-type" >Receive Tez</p>
            <form action="">
                <input type="text" name="" id="" placeholder="User Name" />
                <input type="text" name="" id="cKey" placeholder="Public Key" />
                <button class="send_tez_button" onClick={onReceive}>Collect Tez</button>
            </form>

        </div>
    )
};

export default ReceiveTez;