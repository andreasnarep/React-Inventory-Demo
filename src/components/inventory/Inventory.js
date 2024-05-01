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
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [showPopup, setShowPopup] = useState(false);
  const closePopup = () => setShowPopup(false);

  const [clickedItem, setClickedItem] = useState(null);

  const rowItemClicked = (item) => {
    setClickedItem(item);
    setShowPopup(true);
  }

  return (
    <div className="inventory-main-container">
      <Header></Header>

      <div className="inventory-content">
        <div className="inventory-table-container">
          <div className="inventory-table-content">
            <h4 className="inventory-table-label">Inventory</h4>
            <div className="inventory-table-test">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="2">No Items In Inventory</td>
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