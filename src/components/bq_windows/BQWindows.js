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
        return "Jaanuar";
      case 1:
        return "Veebruar";
      case 2:
        return "Märts";
      case 3:
        return "Aprill";
      case 4:
        return "Mai";
      case 5:
        return "Juuni";
      case 6:
        return "Juuli";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "Oktoober";
      case 10:
        return "November";
      case 11:
        return "Detsember";
      default:
        throw new Error("Wrong month value proposed!");
    }
  }

  const getBQWindows = async () => {
    try {
      const response = await api.get("/api/bq-windows");
      const windowData = response.data;
      console.log(response);
      const names = windowData.map(window => window.name);
      setWindowNames(names);
      setWindowType(names[0]);
      console.log(windowData);
      //setInventoryItems(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddCompletedBQWindows = async () => {
    try {
      const requestBody = data;
      console.log(requestBody);

      const response = await api.post('/api/completed-bq-windows/add', requestBody, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add window');
      }

      // Handle success
      console.log('Window added successfully');
    } catch (error) {
      // Handle error
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
    console.log(e);
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
              <label htmlFor="windowType">Valmistatud BQ Aken</label>
              <select className="bq-windows-type-select" id="windowType" value={windowType} onChange={handlewindowTypeChange}>
                {windowNames.map((windowName, index) => (
                  <option key={index} value={windowName}>{windowName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Kogus</label>
              <input className="bq-windows-quantity-input" type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="form-group">
              <label htmlFor="month">Kuu</label>
              <select className="bq-windows-month-select" id="month" value={month} onChange={handleMonthChange}>
               <option value="Jaanuar">Jaanuar</option>
                <option value="Veebruar">Veebruar</option>
                <option value="Märts">Märts</option>
                <option value="Aprill">Aprill</option>
                <option value="Mai">Mai</option>
                <option value="Juuni">Juuni</option>
                <option value="Juuli">Juuli</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="Oktoober">Oktoober</option>
                <option value="November">November</option>
                <option value="Detsember">Detsember</option>
              </select>
            </div>
            <div className="form-group">
              <button className="bq-windows-confirm-button" onClick={addData}>Kinnita</button>
            </div>
          </form>
        </div>

        <div className="bq-windows-table-container">
          <div className="bq-windows-table-content">
            <table>
              <thead>
                <tr>
                  <th>Valmistatud BQ Aken</th>
                  <th>Kogus</th>
                  <th>Kuu</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="3">Sisestage Valmistatud Aknad</td>
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
              <button className="bq-windows-table-rollback-button" onClick={rollBackButtonPressed}>Eemalda Viimane</button>
              <button className="bq-windows-table-confirm-button" onClick={confirmButtonPressed}>Kinnita Kõik</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BQWindows;