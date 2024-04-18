import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title, data }) => {
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
                    <th className="home-modal-th">Nimi</th>
                    <th className="home-modal-th">Kogus</th>
                    <th className="home-modal-th">Kuu</th>
                  </tr>
                </thead>
                <tbody>
                  {data && Array.isArray(data) && data.map(item => (
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