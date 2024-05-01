import React from "react";
import Header from "../Header";
import { useState, useEffect } from 'react';
import "./BQWindows.css"; // Import CSS file for styling
import api from '../../api/axiosConfig';

const BQWindows = () => {
  const currentMonth = getMonthAsString(new Date().getMonth());
  const [windowType, setWindowType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState([]);
  const [windowNames, setWindowNames] = useState([]);

  useEffect(() => {
    getBQWindows();
  }, []);

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

  const getBQWindows = async () => {
    try {
      const response = await api.get("/api/bq-windows");
      const windowData = response.data;
      const names = windowData.map(window => window.name);
      setWindowNames(names);
      setWindowType(names[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddCompletedBQWindows = async () => {
    try {
      const requestBody = data;

      const response = await api.post('/api/completed-bq-windows/add', requestBody, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add window');
      }
    } catch (error) {
      console.error('Error adding window:', error.message);
    }
  };

  const addData = (event) => {
    event.preventDefault();

    if (!Number.isInteger(parseInt(quantity))) {
      return setQuantity(1);
    }

    if (parseInt(quantity) === 0) {
      return setQuantity(1);
    }

    const newData = { name: windowType, quantity: quantity, month: month };
    setData([...data, newData]);

    setQuantity(1);
    setMonth(currentMonth);
    setWindowType(windowNames[0]);
  };

  const rollBackButtonPressed = (event) => {
    if (data.length > 0) {
      const newData = [...data];
      newData.pop();
      setData(newData);
    }
  }

  const confirmButtonPressed = (event) => {
    handleAddCompletedBQWindows();
    setData([]);
  }

  const handlewindowTypeChange = (e) => {
    setWindowType(e.target.value);
  };

  const handleQuantityChange = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setQuantity(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="bq-windows-main-container">
      <Header></Header>

      <div className="bq-windows-content">

        <div className="form-content">
          <form className="form">
            <div className="form-group">
              <label htmlFor="windowType">Completed BQ Window</label>
              <select className="bq-windows-type-select" id="windowType" value={windowType} onChange={handlewindowTypeChange}>
                {windowNames.map((windowName, index) => (
                  <option key={index} value={windowName}>{windowName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input className="bq-windows-quantity-input" type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="form-group">
              <label htmlFor="month">Month</label>
              <select className="bq-windows-month-select" id="month" value={month} onChange={handleMonthChange}>
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
            <div className="form-group">
              <button className="bq-windows-confirm-button" onClick={addData}>Confirm</button>
            </div>
          </form>
        </div>

        <div className="bq-windows-table-container">
          <div className="bq-windows-table-content">
            <table>
              <thead>
                <tr>
                  <th>Completed BQ Window</th>
                  <th>Quantity</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="3">Insert Completed Windows</td>
                  </tr>
                ) : (
                  data.map(item => (
                    <tr className="bq-windows-table-tr" key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.month}</td>
                    </tr>
                  )))}
              </tbody>
            </table>
            <div className="bq-windows-table-buttons-container">
              <button className="bq-windows-table-rollback-button" onClick={rollBackButtonPressed}>Remove Last</button>
              <button className="bq-windows-table-confirm-button" onClick={confirmButtonPressed}>Confirm All</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BQWindows;