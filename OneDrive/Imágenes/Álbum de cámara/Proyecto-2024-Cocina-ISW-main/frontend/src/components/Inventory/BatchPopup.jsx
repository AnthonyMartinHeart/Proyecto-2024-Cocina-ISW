import React from 'react';

const BatchPopup = ({ show, setShow, children }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close" onClick={() => setShow(false)}>X</button>
        {children}
      </div>
    </div>
  );
};

export default BatchPopup;