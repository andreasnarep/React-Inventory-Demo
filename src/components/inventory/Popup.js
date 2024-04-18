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
    console.log(e);
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

      const response = await api.post('/api/inventory/change-quantity', requestBody, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to change quantity');
      }

      // Handle success
      console.log('Quantity changed succesfully');
    } catch (error) {
      // Handle error
      console.error('Error changing quantity:', error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="inventory-popup-overlay">
          <div className="inventory-popup-content">
            <button className="inventory-popup-close-button" onClick={onClose}>X</button>
            <h4 className="inventory-popup-label">Koguse Muutmine</h4>
            <div>
              <p className="inventory-popup-text">Nimi: {clickedItem.name}</p>
              <p className="inventory-popup-text">Vana Kogus: {clickedItem.quantity}</p>
              <div className="inventory-popup-quantity-change-group">
                <label htmlFor="quantity">Uus Kogus: </label>
                <input className="inventory-popup-quantity-input" type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
              </div>
              <button className="inventory-popup-confirm-button" onClick={confirmButtonClicked}>Kinnita</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;