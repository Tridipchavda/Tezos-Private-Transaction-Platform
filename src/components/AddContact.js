import React, { useEffect, useState } from "react";
import axios from "axios";

// require("../Server/server");
// import Contact from "../Server/db";

const AddContact = () => {

    const [contact, setcontact] = useState([{
        Cname: "",
        Caddress: "",
    }]);

    useEffect(()=>{
        (async ()=>{
          setcontact(contact);
          console.log(contact);
        })();
      });

    const addContact = async () => {

        const ContactName = document.getElementById("ContactName").value;
        const ContactAddress = document.getElementById("ContactAddress").value;

        setcontact((oldItems) => {
            return [...oldItems, { Cname: ContactName, Caddress: ContactAddress }];
        });


    }

    return (
        <>
            <center>
                {/* <div className="AddContact">
            <h3>Add Contact</h3>
            <form method="POST" >
            <input id="ContactName" type="text" placeholder="Enter Name"></input>
            <input id="ContactAddress" type="text" placeholder="Enter Address"></input>
            <button className="AddName" onClick={addContact}>Add Name</button>
            </form>
            </div> */}

                <div className="main">
                    <div className="heading">
                        <h1>Add To Contact</h1>

                    </div>

                    <div className="contact-list-box">

                        <div className="cont">
                            <form action="" className="input-elements">
                                <h3>Create New Contact</h3>
                                <label >Name</label>
                                <input type="text" id="ContactName" placeholder="Name" />
                                <label >Address</label>
                                <input type="text" id="ContactAddress" name="public-key" placeholder="Public Key" />
                                <button type="button" onClick={addContact} className="contactBtn">Add Contact</button>
                            </form>
                        </div>
                        <hr></hr>
                        <h2>Contacts</h2>
                        {contact.map((itemName) => {
                            if (itemName.Cname != "") {
                                return (
                                    <div className="contact" id="contact-1">
                                        <p className="name">{itemName.Cname}</p>
                                        <p className="public_key">{itemName.Caddress}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </center>

            {/* <>
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
            </> */}
        </>
    )
};

export default AddContact;