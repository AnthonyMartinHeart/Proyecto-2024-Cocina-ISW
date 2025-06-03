// src/services/itemBatch.service.js
import axios from './root.service.js';

export async function getItems() {
    try {
        const { data } = await axios.get('/batchesItems/all');
        return data.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener todos los items');
    }
}

export async function getBatchItems(batchId) {
    try {
        const { data } = await axios.get(`/batchesItems/${batchId}/items`);
        return data.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los items del lote');
    }
}

export async function createItem(batchId, itemData) {
    try {
        console.log('Datos enviados:', itemData);   
        const response = await axios.post(`/batchesItems/${batchId}/items`, itemData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear el item');
    }
}

export async function updateItem(batchId, itemId, itemData) {
    try {
        const response = await axios.put(`/batchesItems/${batchId}/items/${itemId}`, itemData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el item');
    }
}

export async function deleteItem(batchId, itemId) {
    try {
        const response = await axios.delete(`/batchesItems/${batchId}/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el item');
    }
}