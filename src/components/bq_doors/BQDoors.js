import React from "react";
import Header from "../Header";
import { useState, useEffect } from 'react';
import "./BQDoors.css"; // Import CSS file for styling
import api from '../../api/axiosConfig';

const BQDoors = () => {
  const currentMonth = getMonthAsString(new Date().getMonth());
  const [doorType, setDoorType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState([]);
  const [doorNames, setDoorNames] = useState([]);

  useEffect(() => {
    getBQDoors();
  }, []);


  const getBQDoors = async () => {
    try {
      const response = await api.get("/api/bq-doors");
      const doorData = response.data;
      console.log(response);
      const names = doorData.map(door => door.name);
      setDoorNames(names);
      setDoorType(names[0]);
      console.log(doorData);
      //setInventoryItems(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddCompletedBQDoors = async () => {
    try {
      const requestBody = data;
      console.log(requestBody);

      const response = await api.post('/api/completed-bq-doors/add', requestBody, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add door');
      }

      // Handle success
      console.log('Door added successfully');
    } catch (error) {
      // Handle error
      console.error('Error adding door:', error.message);
    }
  };

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

  const addData = (event) => {
    event.preventDefault();
    //handleAddCompletedBQDoors();

    //getBQDoors();

    if (!Number.isInteger(parseInt(quantity))) {
      return setQuantity(1);
    }

    if (parseInt(quantity) == 0) {
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
    handleAddCompletedBQDoors();
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
    <div className="bq-doors-main-container">
      <Header></Header>

      <div className="bq-doors-content">

        <div className="bq-doors-form-content">
          <form className="bq-doors-form">
            <div className="bq-doors-form-group">
              <label htmlFor="doorType">Valmistatud BQ Uks</label>
              <select className="bq-doors-type-select" id="doorType" value={doorType} onChange={handleDoorTypeChange}>
                {doorNames.map((doorName, index) => (
                  <option key={index} value={doorName}>{doorName}</option>
                ))}
              </select>
            </div>
            <div className="bq-doors-form-group">
              <label htmlFor="quantity">Kogus</label>
              <input className="bq-doors-quantity-input" type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
            </div>
            <div className="bq-doors-form-group">
              <label htmlFor="month">Kuu</label>
              <select className="bq-doors-month-select" id="month" value={month} onChange={handleMonthChange}>
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
            <div className="bq-doors-form-group">
              <button className="bq-doors-confirm-button" onClick={addData}>Kinnita</button>
            </div>
          </form>
        </div>

        <div className="bq-doors-table-container">
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
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="3">Sisestage Valmistatud Uksed</td>
                  </tr>
                ) : (
                  data.map(item => (
                    <tr className="bq-doors-table-tr" key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.month}</td>
                    </tr>
                  )))}
              </tbody>
            </table>
            <div className="bq-doors-table-buttons-container">
              <button className="bq-doors-table-rollback-button" onClick={rollBackButtonPressed}>Eemalda Viimane</button>
              <button className="bq-doors-table-confirm-button" onClick={confirmButtonPressed}>Kinnita Kõik</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BQDoors;