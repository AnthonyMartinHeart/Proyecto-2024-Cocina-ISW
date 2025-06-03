import React from 'react';

const OrderModal = ({ isOpen, onClose, onConfirm, action }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{action === 'eliminar' ? '¿Estás seguro de que deseas eliminar esta orden?' : '¿Estás seguro de que deseas actualizar esta orden?'}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Sí</button>
          <button onClick={onClose} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
