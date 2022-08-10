import { useEffect, useState } from "react";
import { fetchTransaction } from "../utils/fetchTransaction";
import { getAccount } from "../utils/wallet";


const Pending=()=>{
    const [transaction,setTransaction] = useState([{
        cKey:"None",
        amount:0,
        to:"None",
        valid:true
    }]);

    const onCopyKey = (e) =>{
        console.log(e.target.id)
        navigator.clipboard.writeText(e.target.id);

        alert("Key has been copied");
    }
   
    useEffect(()=>{
        (async ()=>{
            
            const activeAccount = await getAccount();
            const storage = await fetchTransaction();
            
            console.log(storage);

            let arr= [{}];
            let count = 0;
            for(let i=0;i<storage.list.length;i++){
                console.log(storage.list[i]._from);

                if(storage.list[i]._from == activeAccount){
                    console.log("Yes");

                    //Saving Data In Variables
                    const cKey = storage.list[i].cKey;
                    const to = storage.list[i]._to;
                    const amount = parseInt(storage.list[i].amount)/1000000;
                    const valid = storage.list[i].valid;

                    console.log(storage.list[i].valid);
                    
                    arr[count++] = {cKey,to,amount,valid}
                    
                }
            }

            console.log(arr);
            
            
            console.log("Transaction");
            setTransaction(arr);
            console.log(transaction);
            // if( storage.record1[activeAccount] == undefined){
            //     alert("No Transaction History");
            //     return;
            // }
            // console.log(storage.pending);

            

            
        })();
      },[]);
    
        return (
            <div className="pending">
                {/* <h2>Transactions Pending</h2>
                <hr></hr>
                
                <table className="entries">
                    <tr>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Transaction Key</th>
                        <th>Status</th>
                    </tr>
                    {transaction.map(record=>{
                        if(record.cKey != undefined){
                            return (
                                <tr>
                                    <td>{record.to}</td>
                                    <td>{record.amount} ꜩ</td>
                                    <td className="pointer" id={record.cKey} onClick={onCopyKey}>{record.cKey}</td>
                                    <td>{record.amount==0
                                        ?<img width="30px" height="30px" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-correct-press-and-media-flaticons-flat-flat-icons.png"/>
                                        :<img width="30px" height="30px" src="https://img.icons8.com/ios/50/000000/alarm-clock--v1.png"/>
                                    }</td>
                                </tr>
                            )
                        }
                    })}
                </table>         */}
        <div className="center_div02">
        <div className="center_div02_temp">
            <div className="transaction_history_title">
                <p>transaction history</p>
            </div>
            <div className="history_data">
                <div className="history_data01">
                    
                    {transaction.map(record=>{
                        if(record.cKey != undefined){
                            return (
                                <>
                                <div className="common_history">
                                <div className="col1">
                                    <p>{record.to}</p>
                                    <p id={record.cKey} onClick={onCopyKey}>{record.cKey.substring(0,40)+"..."}</p>
                                </div>
                                <div className="col2">
                                    <p>{record.amount}</p>
                                    <p>3 aug 2022, 11:15pm</p>
                                </div>
                                <div className="col3">
                                    {record.valid==false
                                        ?<img width="30px" height="30px" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-correct-press-and-media-flaticons-flat-flat-icons.png"/>
                                        :<img width="30px" height="30px" src="https://img.icons8.com/ios/50/000000/alarm-clock--v1.png"/>
                                    }
                                </div>
                                </div>
                                </>
                            )
                        }
                    })}
                    </div>
                </div>
           </div>
           </div>
           </div>

        )
    }

export default Pending;