// src/components/PopupEmployee.jsx
import React from 'react';
import EmployeeForm from './EmployeeForm';
import CloseIcon from '@assets/XIcon.svg';
import '@styles/popupemployee.css';

const PopupEmployee = ({ show, setShow, employee, onFormSubmit }) => {
    if (!show) return null;

    return (
        <div className="popup-bg">
            <div className="popup">
                <button className="close" onClick={() => setShow(false)}>
                    <img src={CloseIcon} alt="Cerrar" />
                </button>
                <EmployeeForm employee={employee} onFormSubmit={onFormSubmit} onClose={() => setShow(false)} />
            </div>
        </div>
    );
};

export default PopupEmployee;
