import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import BQDoors from './components/bq_doors/BQDoors';
import BQWindows from './components/bq_windows/BQWindows';
import PoloDoors from './components/polo_doors/PoloDoors';
import Inventory from './components/inventory/Inventory';
import Login from './components/login/Login';
import AuthWrapper from './Authwrapper';

function App() {

  //const [inventoryItems, setInventoryItems] = useState();

  //const getInventoryItems = async () => {
  //  try {
  //    const response = await api.get("/api/inventory");
  //    console.log(response.data);
  //    setInventoryItems(response.data);
  //  } catch (err) {
  //    console.log(err);
  //  }
  //}

  //useEffect(() => {
  //  getInventoryItems();
  //}, [])

  //const [loggedIn, setLoggedIn] = useState(false)
  //const [email, setEmail] = useState('')

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>} />
        <Route path="/bq-uksed" element={<AuthWrapper><BQDoors /></AuthWrapper>}></Route>
        <Route path="/bq-aknad" element={<AuthWrapper><BQWindows /></AuthWrapper>}></Route>
        <Route path="/polo-uksed" element={<AuthWrapper><PoloDoors /></AuthWrapper>}></Route>
        <Route path="/ladu" element={<AuthWrapper><Inventory /></AuthWrapper>}></Route>
      </Routes>
    </div>
  );
}

export default App;
