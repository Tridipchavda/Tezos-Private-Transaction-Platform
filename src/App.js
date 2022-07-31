import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import AddContact from "./components/AddContact";

import SendTez from "./components/SendTez";
import ReceiveTez from "./components/ReceiveTez";
import Pending from "./components/PendingTransaction";
const App = () => {
 

  return (
    <div>
      <Navbar/>
      <SendTez/>
      <ReceiveTez/>
      <Pending/>
      {/* <AddContact/> */}
    </div>
  );
};

export default App;
