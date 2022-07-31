import { useEffect, useState } from "react";
import { fetchTransaction } from "../utils/fetchTransaction";
import { getAccount } from "../utils/wallet";


const Pending=()=>{
    const [transaction,setTransaction] = useState([{}]);

    const onCopyKey = (e) =>{
        console.log(e.target.id)
        navigator.clipboard.writeText(e.target.id);

        alert("Key has been copied");
    }
   
    useEffect(()=>{
        (async ()=>{
            
            const activeAccount = await getAccount();
            const storage = await fetchTransaction();
            
            if( storage.record1[activeAccount] == undefined){
                alert("No Transaction History");
                return;
            }
            console.log(storage.pending);

            const cKey = storage.record1[activeAccount];
            const to = storage.pending[cKey]._to;
            const amount = parseInt(storage.pending[cKey].amount)/1000000;

            let arr = transaction.concat({cKey,to,amount})
            setTransaction(arr);
            console.log(transaction);
        })();
      },[]);
    if(transaction.length==1){
        return (
            <div className="pending">
                <h2>Transactions Pending</h2>
                <hr></hr>
                <p className="noPending"> No Transaction Pending </p>
            </div>
        )
    }
    else{
        return (
            <div className="pending">
                <h2>Transactions Pending</h2>
                <hr></hr>
                
                <table className="entries">
                    <tr>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Transaction Key</th>
                    </tr>
                    {transaction.map(record=>{
                        if(record.cKey != undefined){
                            return (
                                <tr>
                                    <td>{record.to}</td>
                                    <td>{record.amount} ꜩ</td>
                                    <td className="pointer" id={record.cKey} onClick={onCopyKey}>{record.cKey}</td>
                                </tr>
                            )
                        }
                    })}
                </table>        
            </div>
        )
    }
}
export default Pending;