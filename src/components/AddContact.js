import React, { useEffect, useState } from "react";
import axios from "axios";

const AddContact = ()=>{

    const [contact,setcontact] = useState([{
        Cname:"",
        Caddress:"",
    }]);
    

    useEffect(()=>{
        
        (()=>{
            
        })();
      },[]);

    const addContact = () =>{
        
        const ContactName = document.getElementById("ContactName").value ;
        const ContactAddress = document.getElementById("ContactAddress").value ;
        
        setcontact((oldItems)=>{
            return [...oldItems,{Cname:ContactName,Caddress:ContactAddress}];
        });

    }

    return (
        <>
        <center>
            <div className="AddContact">
            <h3>Add Contact</h3>
            <input id="ContactName" type="text" placeholder="Enter Name"></input>
            <input id="ContactAddress" type="text" placeholder="Enter Address"></input>
            <button className="AddName" onClick={addContact}>Add Name</button>
            </div>
            
        </center>
        
        <>
        <hr className="line"></hr>
        <h1 className="contactHeading"> All Contacts</h1>
        
        <div className="contacts">
            {contact.map( (itemName)=>{
                if(itemName.Cname!=""){
                    return (
                    <div className="card">
                        <h5>{itemName.Cname}</h5>
                        <p>{itemName.Caddress}</p>
                    </div>
                    )
                }
            })}
        
        </div>

        <hr className="line"></hr>
        </>
        </>
    )
};

export default AddContact;