import React from "react";
import Header from "../Header";
import { useState } from 'react';
import "./BQDoors.css"; // Import CSS file for styling

const BQDoors = () => {
  const [doorType, setDoorType] = useState('Wood');
  const [quantity, setQuantity] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Adding 1 because months are zero-indexed

  const handleDoorTypeChange = (e) => {
    setDoorType(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const data = [
    { name: '353', quantity: 30, month: 'january' },
    { name: '1242', quantity: 25, month: 'february' },
    { name: '5235', quantity: 40, month: 'march' }
  ]

  return (
    <div className="main-container">
      <Header></Header>
      <div className="content">
        <div className="form-content">
          <form className="form">
            <div className="form-group">
              <label htmlFor="doorType">Valmistatud BQ Uks</label>
              <select className="door-type-select" id="doorType" value={doorType} onChange={handleDoorTypeChange}>
                <option value="wood">Wood</option>
                <option value="metal">Metal</option>
                <option value="glass">Glass</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Kogus</label>
              <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="form-group">
              <label htmlFor="month">Kuu</label>
              <select className="month-select" id="month" value={month} onChange={handleMonthChange}>
                <option value="january">Jaanuar</option>
                <option value="february">Veebruar</option>
                <option value="march">Märts</option>
              </select>
            </div>
          </form>
        </div>

        <div className="bq-doors-table-content">
          <table>
            <thead>
              <tr>
                <th>Valmistatud BQ Uks</th>
                <th>Kogus</th>
                <th>Kuu</th>
              </tr>
            </thead>
            <tbody>
              {data && Array.isArray(data) && data.map(item => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BQDoors;