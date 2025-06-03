// components/MenuForm.jsx
import React, { useState, useEffect } from 'react';
import { createMenuItem, updateMenuItem } from '@services/menu.service';

const MenuForm = ({ menuItemToEdit, onSave }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        if (menuItemToEdit) {
            setNombre(menuItemToEdit.nombre);
            setDescripcion(menuItemToEdit.descripcion);
            setPrecio(menuItemToEdit.precio);
        }
    }, [menuItemToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMenuItem = { nombre, descripcion, precio };

        try {
            if (menuItemToEdit) {
                await updateMenuItem(menuItemToEdit.id, newMenuItem);
            } else {
                await createMenuItem(newMenuItem);
            }
            onSave(); // Llamar a la función de callback después de guardar
            clearForm();
        } catch (error) {
            console.error('Error saving menu item:', error);
        }
    };

    const clearForm = () => {
        setNombre('');
        setDescripcion('');
        setPrecio('');
    };

    return (
        <form onSubmit={handleSubmit} className="menu-form">
            <div>
                <label>NOMBRE:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>DESCRIPCIÓN:</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>PRECIO:</label>
                <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    step="0.01"
                />
            </div>
            <button type="submit">{menuItemToEdit ? 'Actualizar' : 'Agregar'} Plato</button>
        </form>
    );
};

export default MenuForm;
