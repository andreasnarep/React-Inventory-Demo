import React from "react";
import Header from "../Header";
import { useState, useEffect } from 'react';
import "./PoloDoors.css"; // Import CSS file for styling
import api from '../../api/axiosConfig';

const PoloDoors = () => {
  const currentMonth = getMonthAsString(new Date().getMonth());
  const [doorType, setDoorType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState([]);
  const [doorNames, setDoorNames] = useState([]);

  useEffect(() => {
    getPoloDoors();
  }, []);

  const getPoloDoors = async () => {
    try {
      const response = await api.get("/api/polo-doors");
      const doorData = response.data;
      const names = doorData.map(door => door.name);
      setDoorNames(names);
      setDoorType(names[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddCompletedPoloDoors = async () => {
    try {
      const requestBody = data;

      const response = await api.post('/api/completed-polo-doors/add', requestBody, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add door');
      }
    } catch (error) {
      console.error('Error adding door:', error.message);
    }
  };

  function getMonthAsString(monthNumber) {
    switch (monthNumber) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        throw new Error("Wrong month value proposed!");
    }
  }

  const addData = (event) => {
    event.preventDefault();

    if (!Number.isInteger(parseInt(quantity))) {
      return setQuantity(1);
    }

    if (parseInt(quantity) === 0) {
      return setQuantity(1);
    }

    const newData = { name: doorType, quantity: quantity, month: month };
    setData([...data, newData]);

    setQuantity(1);
    setMonth(currentMonth);
    setDoorType(doorNames[0]);
  };

  const rollBackButtonPressed = (event) => {
    if (data.length > 0) {
      const newData = [...data];
      newData.pop();
      setData(newData);
    }
  }

  const confirmButtonPressed = (event) => {
    handleAddCompletedPoloDoors();
    setData([]);
  }

  const handleDoorTypeChange = (e) => {
    setDoorType(e.target.value);
  };

  const handleQuantityChange = (e) => {
    if (e.target.value < 0) {
      return;
    }
    console.log(e);
    setQuantity(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="polo-doors-main-container">
      <Header></Header>

      <div className="polo-doors-content">

        <div className="polo-doors-form-content">
          <form className="polo-doors-form">
            <div className="polo-doors-form-group">
              <label htmlFor="doorType">Completed Polo Door</label>
              <select className="polo-doors-type-select" id="doorType" value={doorType} onChange={handleDoorTypeChange}>
                {doorNames.map((doorName, index) => (
                  <option key={index} value={doorName}>{doorName}</option>
                ))}
              </select>
            </div>
            <div className="polo-doors-form-group">
              <label htmlFor="quantity">Quantity</label>
              <input className="polo-doors-quantity-input" type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="polo-doors-form-group">
              <label htmlFor="month">Month</label>
              <select className="polo-doors-month-select" id="month" value={month} onChange={handleMonthChange}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="polo-doors-form-group">
              <button className="polo-doors-confirm-button" onClick={addData}>Confirm</button>
            </div>
          </form>
        </div>

        <div className="polo-doors-table-container">
          <div className="polo-doors-table-content">
            <table>
              <thead>
                <tr>
                  <th>Completed Polo Door</th>
                  <th>Quantity</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="3">Insert Completed Doors</td>
                  </tr>
                ) : (
                  data.map(item => (
                    <tr className="polo-doors-table-tr" key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.month}</td>
                    </tr>
                  )))}
              </tbody>
            </table>
            <div className="polo-doors-table-buttons-container">
              <button className="polo-doors-table-rollback-button" onClick={rollBackButtonPressed}>Remove Last</button>
              <button className="polo-doors-table-confirm-button" onClick={confirmButtonPressed}>Confirm All</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PoloDoors;