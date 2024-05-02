import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import BQDoors from './components/bq_doors/BQDoors';
import BQWindows from './components/bq_windows/BQWindows';
import PoloDoors from './components/polo_doors/PoloDoors';
import Inventory from './components/inventory/Inventory';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bq-doors" element={<BQDoors />}></Route>
        <Route path="/bq-windows" element={<BQWindows />}></Route>
        <Route path="/polo-doors" element={<PoloDoors />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
      </Routes>
    </div>
  );
}

export default App;
