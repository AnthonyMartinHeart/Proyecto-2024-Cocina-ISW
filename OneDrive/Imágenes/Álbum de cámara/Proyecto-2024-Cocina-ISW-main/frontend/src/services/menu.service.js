// src/services/menu.service.js
import axios from './root.service.js';

const API_URL = '/menu';  // Base URL for the menu API

export const getMenuItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`); // Correct route: '/get' to fetch menu items
        return response.data;
    } catch (error) {
        console.error('Error fetching menu items', error);
        throw error;
    }
};

export const createMenuItem = async (menuData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, menuData); // Correct route: '/create' to add a new menu item
        return response.data;
    } catch (error) {
        console.error('Error creating menu item', error);
        throw error;
    }
};

export const updateMenuItem = async (id, menuData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, menuData); // Correct route: '/:id' to update a menu item
        return response.data;
    } catch (error) {
        console.error('Error updating menu item', error);
        throw error;
    }
};

export const deleteMenuItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`); // Correct route: '/:id' to delete a menu item
        return response.data;
    } catch (error) {
        console.error('Error deleting menu item', error);
        throw error;
    }
};
