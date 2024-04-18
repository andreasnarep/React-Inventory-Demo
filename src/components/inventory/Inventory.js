import React from "react";
import Header from "../Header";
import { useState, useEffect } from 'react';
import "./Inventory.css";
import Popup from "./Popup.js";
import api from '../../api/axiosConfig';

const Inventory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInventory();
  }, []);

  const getInventory = async () => {
    try {
      const response = await api.get("/api/inventory");
      const inventoryData = response.data;
      console.log(response);
      //setDoorNames(names);
      //setDoorType(names[0]);
      console.log(inventoryData);
      setData(response.data);
      //return inventoryData;
    } catch (err) {
      console.log(err);
    }
  }

  const [showPopup, setShowPopup] = useState(false);
  const closePopup = () => setShowPopup(false);

  const [clickedItem, setClickedItem] = useState(null);

  const rowItemClicked = (item) => {
    // Set the clicked item
    setClickedItem(item);
    // Show the popup
    setShowPopup(true);
  }

  return (
    <div className="inventory-main-container">
      <Header></Header>

      <div className="inventory-content">
        <div className="inventory-table-container">
          <div className="inventory-table-content">
            <h4 className="inventory-table-label">Inventuur</h4>
            <div className="inventory-table-test">
              <table>
                <thead>
                  <tr>
                    <th>Nimi</th>
                    <th>Kogus</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="2">Inventuur On Tühi</td>
                    </tr>
                  ) : (
                    data.map(item => (
                      <tr className={`inventory-table-tr ${item.quantity < 10 ? 'inventory-table-red-row' : ''}`} key={item.name} onClick={() => rowItemClicked(item)}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Popup clickedItem={clickedItem} isOpen={showPopup} onClose={closePopup}></Popup>
      </div>

    </div>
  );
};

export default Inventory;