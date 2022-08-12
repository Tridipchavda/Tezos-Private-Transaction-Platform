import { useState, useEffect, StrictMode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

// Builded Components
import Navbar from './components/Navbar';
import AddContact from "./components/AddContact";
import SendTez from "./components/SendTez";
import ReceiveTez from "./components/ReceiveTez";
import Pending from "./components/PendingTransaction";
import Menu from "./components/Menu";
import QRCode from "./components/qrCode";

const App = () => {


  return (
    
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<><Menu/> <Pending /></>}>
          </Route>
          <Route path="/send" element={<SendTez />}>
          </Route>
          <Route path="/receive" element={<ReceiveTez />}>
          </Route>
          <Route path="/QRcode" element={<QRCode />}>
          </Route>
          <Route path="/contact" element={<StrictMode><AddContact /></StrictMode>}>
          </Route>
      </Routes>
    </Router>

  );
};

export default App;
