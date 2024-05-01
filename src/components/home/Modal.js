import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title, data }) => {
  // Create a copy of the data array to avoid mutation
  const combinedData = [...data];

  // Preprocess the data to combine entries with the same name
  const processedData = combinedData.reduce((acc, currentItem) => {
    // Check if there's already an item with the same name in the accumulator
    const existingItem = acc.find(item => item.name === currentItem.name);

    // If there's an existing item, update its quantity, otherwise add the current item to the accumulator
    if (existingItem) {
      existingItem.quantity += currentItem.quantity;
    } else {
      acc.push({ ...currentItem }); // Create a copy of the current item to avoid mutation
    }
    return acc;
  }, []);

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <button className="close-button" onClick={onClose}>X</button>
              <h2 className="table-title"> {title} </h2>
              <table>
                <thead>
                  <tr>
                    <th className="home-modal-th">Name</th>
                    <th className="home-modal-th">Quantity</th>
                    <th className="home-modal-th">Month</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.map(item => (
                    <tr key={item.id}>
                      <td className="home-modal-td">{item.name}</td>
                      <td className="home-modal-td">{item.quantity}</td>
                      <td className="home-modal-td">{item.month}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;