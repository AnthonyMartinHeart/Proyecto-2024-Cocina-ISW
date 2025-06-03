// src/hooks/inventory/items/useFetchBatchItems.jsx
import { useEffect, useState } from 'react';
import { getBatchItems } from '@services/itemBatch.service.js';
import { showErrorAlert } from '@helpers/sweetAlert';

const useFetchBatchItems = (batchId) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBatchItems = async () => {
        if (!batchId) return;
        setLoading(true);
        try {
            const data = await getBatchItems(batchId);
            setItems(data);
        } catch (error) {
            showErrorAlert('Error', 'No se pudieron cargar los items del lote');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBatchItems();
    }, [batchId]);

    return { items, loading, fetchBatchItems };
};

export { useFetchBatchItems };
