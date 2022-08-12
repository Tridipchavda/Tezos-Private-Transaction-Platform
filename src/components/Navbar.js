import { useEffect, useState } from "react";
import { tezos } from "../utils/tezos";
import { connectWallet, getAccount } from "../utils/wallet";
import AddContact from "./AddContact";
import React from "react";


// Fixed Componet of React App Shows Wallet Balance and Address
const Navbar = () => {

  // For Getting / Setting the wallet Account
  const [account,setAccount] = useState("");
  // For Getting and Displaying wallet balance
  const [balance,setBalance] = useState("");
  const [loading,setLoading] = useState(0);
  
  // Fetching Saved Account if any
  useEffect(()=>{
    (async ()=>{
      
      if(window.navigator.onLine){
        try{
          const activeAccount = await getAccount();
          setAccount(activeAccount);
          
          refreshBalance(activeAccount);
        }
        catch(err){
          console.log("No Connection Found");
        }
      }
      
    })();
  },[]);

  // Checking the balance and refresh It.
  const refreshBalance = async (address)=>{
    if(address!=""){
      tezos.tz.getBalance(address).then((balance)=>{
        console.log("your balance is "+balance);

        var convertedBalance = balance/1000000;
        setBalance(convertedBalance);
      });
    }
  }

  // Connecting wallet Account with App
  const onconnectwallet = async ()=>{
    await connectWallet();
    const activeAddress = await getAccount();
    setAccount(activeAddress);
    
    refreshBalance(activeAddress);
  }
  
  return (
    <>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    <div className="navbar">
      <div className="container py-1">
      <div className="d-flex">
          
          <button onClick={onconnectwallet} className="btn">
            {account !=="" ? account : "Connect Wallet"}
          </button>
        </div>
        <a href="/" className="navbar-brand name">
          {balance !==""? `Balance: ${balance} ꜩ` : "Tez Pay" }
        </a>
        
      </div>
    </div>
    </>
  );

};

export default Navbar;

