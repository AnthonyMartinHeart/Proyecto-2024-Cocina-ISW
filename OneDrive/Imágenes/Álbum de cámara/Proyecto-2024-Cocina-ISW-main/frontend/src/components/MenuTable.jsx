// components/MenuTable.jsx
import React, { useState, useEffect } from 'react';
import { getMenuItems, deleteMenuItem } from '../services/menu.service';

const MenuTable = ({ onEdit, onDelete }) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getMenuItems();
                setMenuItems(data.data); // Asumimos que la respuesta tiene una propiedad 'data'
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenu();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteMenuItem(id);
            setMenuItems(menuItems.filter(item => item.id !== id));
            onDelete();
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

    return (
        <div>
            <h3 className="title-table">Menú</h3>
            <table className="menu-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.precio}</td>
                            <td>
                                <button onClick={() => onEdit(item)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                        <path d="M16.744 3.111l.67-.67a1.25 1.25 0 0 1 1.768 1.768l-.67.67a1.25 1.25 0 0 0 0 1.768l1.115 1.114a1.25 1.25 0 0 1 0 1.768l-.67.67a1.25 1.25 0 0 1-1.768 0l-1.114-1.115a1.25 1.25 0 0 0-1.768 0l-.67.67a1.25 1.25 0 0 0 0 1.768l.67.67a1.25 1.25 0 0 1 0 1.768l-1.115 1.115a1.25 1.25 0 0 1-1.768 0l-.67-.67a1.25 1.25 0 0 0-1.768 1.768l-.67-.67a1.25 1.25 0 0 1 1.768-1.768l1.115-1.115a1.25 1.25 0 0 0 1.768 0l.67-.67a1.25 1.25 0 0 0 0-1.768l-.67-.67a1.25 1.25 0 0 0-1.768 0z" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MenuTable;
