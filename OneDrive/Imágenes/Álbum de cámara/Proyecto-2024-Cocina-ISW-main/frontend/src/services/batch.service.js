// src/services/batch.service.js
import axios from './root.service.js';

export async function getAllBatches() {
    try {
        const { data } = await axios.get('/batches/getall');
        return data.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los lotes');
    }
}

export async function getBatch(batchId) {
    try {
        const { data } = await axios.get(`/batches/get/${batchId}`);
        return data.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el lote');
    }
}

export async function createBatch(batchData) {
    try {
        const response = await axios.post('/batches/purchase', batchData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear el lote');
    }
}

export async function updateBatch(id, batchData) {
    console.log("URL del backend:", `/batches/upd/${id}`);
    console.log("Datos enviados al backend:", batchData);

    try {
        const response = await axios.put(`/batches/upd/${id}`, batchData);
        return response.data;
    } catch (error) {
        console.error("Error en updateBatch:", error.response?.data || error.message);
        throw new Error('Error al actualizar el lote');
    }
}

export async function deleteBatch(id) {
    try {
        const response = await axios.delete(`/batches/del/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el lote');
    }
}