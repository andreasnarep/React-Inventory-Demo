import React from "react";
import "./Popup.css";
import { useState } from "react";
import api from '../../api/axiosConfig';

const Popup = ({ clickedItem, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setQuantity(e.target.value);
  };

  const confirmButtonClicked = (e) => {
    handleQuantityChagne();
    setQuantity(0);
    onClose();
  };

  const handleQuantityChagne = async () => {
    try {
      const requestBody = [
        {
          name: clickedItem.name,
          quantity: parseInt(quantity)
        }
      ];

      clickedItem.quantity = parseInt(quantity);
      
      const response = await api.post('/api/inventory/change-quantity', requestBody, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      
      if (!response.ok) {
        throw new Error('Failed to change quantity');
      }
    } catch (error) {
      console.error('Error changing quantity:', error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="inventory-popup-overlay">
          <div className="inventory-popup-content">
            <button className="inventory-popup-close-button" onClick={onClose}>X</button>
            <h4 className="inventory-popup-label">Change Quantity</h4>
            <div>
              <p className="inventory-popup-text">Item Name: {clickedItem.name}</p>
              <p className="inventory-popup-text">Old Quantity: {clickedItem.quantity}</p>
              <div className="inventory-popup-quantity-change-group">
                <label htmlFor="quantity">New Quantity: </label>
                <input className="inventory-popup-quantity-input" type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
              </div>
              <button className="inventory-popup-confirm-button" onClick={confirmButtonClicked}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;