import React, { useEffect, useState } from "react";
import { getAccount } from "../utils/wallet";

// Return Contact Component
const AddContact = () => {
    // Storing Contact Objects Array
    const [contact, setContact] = useState([{}]);

    // Fetching JSON File from database
    const database = async () => {
        const activeAccount = await getAccount();

        //Checking Active Account
        if (activeAccount != "") {
            const data = await fetch(`https://contacts-7f66a-default-rtdb.firebaseio.com/${activeAccount}.json`);
            const json = await data.json();
            
            // console.log(json);
            return json;
        }
    }
    //Setting up all the contacts in div components
    useEffect(() => {

        const fetchContacts = async () => {
            let arr = [];

            const res = await database();
            // console.log(res);

            for (let key in res) {

                const Cname = res[key].Cname;
                const Caddress = res[key].Caddress;

                // Checking Duplicate Values
                if (!arr[Cname]) {
                    setContact(olditems =>
                        [...olditems, { Cname, Caddress }]
                    );
                }
                arr[Cname] = Caddress;
            }

            // console.log("Fetch Result");
            // console.log(contact);
        };

        // For Calling Fetch Data only once
        return ()=>fetchContacts();
    }, []);

    // Function to ADD data to Firebase Database
    const addContact = async () => {

        const activeAccount = await getAccount();

        if (activeAccount != "") {
            const ContactName = document.getElementById("ContactName").value;
            const ContactAddress = document.getElementById("ContactAddress").value;
            
            //Making Database of name of Public Key
            const res = await fetch(`https://contacts-7f66a-default-rtdb.firebaseio.com/${activeAccount}.json`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        Cname: ContactName,
                        Caddress: ContactAddress,
                    }),
                }
            )

            // Checking response from database
            if (res) {
                alert("Success");
            }
            else {
                alert("Failed");
            }
        }
    }

    return (
        <>
            <center>
                <div className="main">
                    <div className="heading">
                        <h1>Add To Contact</h1>
                    </div>

                    <div className="contact-list-box">
                        <div className="cont">
                            <form action="" className="input-elements">
                                <h3>Create New Contact</h3>
                                {/* <label >Name</label> */}
                                <input type="text" id="ContactName" placeholder="Name" />
                                {/* <label >Address</label> */}
                                <input type="text" id="ContactAddress" name="public-key" placeholder="Public Key" />
                                <button type="button" onClick={addContact} className="contactBtn">Add Contact</button>
                            </form>
                        </div>
                        <hr></hr>
                        <h2>Contacts</h2>
                        
                        {contact.map((itemName) => {
                            if (itemName.Cname) {
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
        </>
    )
};

export default AddContact;