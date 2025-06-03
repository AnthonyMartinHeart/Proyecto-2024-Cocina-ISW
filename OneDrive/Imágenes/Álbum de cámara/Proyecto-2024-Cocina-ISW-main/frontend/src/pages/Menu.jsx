// MenuPage.jsx
import React, { useState, useEffect } from 'react';
import MenuTable from '../components/MenuTable';
import MenuForm from '../components/MenuForm';
import MenuModal from '../components/MenuModal';
import { deleteMenuItem, getMenuItems } from '../services/menu.service'; // Asegúrate de importar el servicio para eliminar
import '@styles/menu.css'; // Importa los estilos

const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuItemToEdit, setMenuItemToEdit] = useState(null);
    const [menuItems, setMenuItems] = useState([]);  // Lista de menús
    const [menuItemToDelete, setMenuItemToDelete] = useState(null); // El plato que se va a eliminar

    // Cargar el menú al iniciar el componente
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await getMenuItems();
                setMenuItems(response.data);  // Asegúrate de que la estructura de la respuesta sea la esperada
            } catch (error) {
                console.error('Error al obtener el menú:', error);
            }
        };

        fetchMenuItems();
    }, []);

    // Función para eliminar un plato
    const handleDeleteMenuItem = async () => {
        if (menuItemToDelete) {
            try {
                await deleteMenuItem(menuItemToDelete.id);  // Llama al servicio de eliminación
                setMenuItems(menuItems.filter(item => item.id !== menuItemToDelete.id));  // Actualiza la lista de platos
                setIsModalOpen(false);  // Cierra el modal
                setMenuItemToDelete(null);  // Resetea el plato a eliminar
            } catch (error) {
                console.error('Error al eliminar el plato:', error);
            }
        }
    };

    // Función para actualizar el menú cuando se guarde un nuevo plato o se edite uno existente
    const handleSave = () => {
        // Actualiza la lista del menú después de guardar un plato
        const fetchMenuItems = async () => {
            try {
                const response = await getMenuItems();
                setMenuItems(response.data);  // Actualiza los platos después de guardar
            } catch (error) {
                console.error('Error al obtener el menú:', error);
            }
        };

        fetchMenuItems();
    };

    const handleEditMenuItem = (menuItem) => {
        setMenuItemToEdit(menuItem);
    };

    const handleDeleteClick = (menuItem) => {
        setMenuItemToDelete(menuItem);
        setIsModalOpen(true);  // Abre el modal para confirmar la eliminación
    };

    return (
        <div className="main-container">
            <h2 className="title-table">Gestión de Menú</h2>
            <MenuForm menuItemToEdit={menuItemToEdit} onSave={handleSave} />
            <MenuTable 
                menuItems={menuItems} 
                onEdit={handleEditMenuItem} 
                onDelete={handleDeleteClick}  // Actualizado para pasar el plato a eliminar
            />
            <MenuModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleDeleteMenuItem}  // Llama a la función de eliminación
            />
        </div>
    );
};

export default Menu;
