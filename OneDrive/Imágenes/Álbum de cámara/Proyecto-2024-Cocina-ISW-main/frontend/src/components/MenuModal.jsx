// components/MenuModal.jsx
import React from 'react';

const MenuModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>¿Estás seguro de eliminar este plato?</h2>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Sí, eliminar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default MenuModal;
