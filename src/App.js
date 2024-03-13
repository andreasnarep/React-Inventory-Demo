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

function App() {

  const [inventoryItems, setInventoryItems] = useState();

  const getInventoryItems = async () => {
    try {
      const response = await api.get("/api/inventory");
      console.log(response.data);
      setInventoryItems(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getInventoryItems();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/bq-uksed" element={<BQDoors/>}></Route>
          <Route path="/bq-aknad" element={<BQWindows/>}></Route>
          <Route path="/polo-uksed" element={<PoloDoors/>}></Route>
          <Route path="/ladu" element={<Inventory/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
