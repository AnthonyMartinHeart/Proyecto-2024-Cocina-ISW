// src/hooks/useFetchBatch.jsx
import { useEffect, useState } from 'react';
import { getBatch } from '@services/batch.service';
import { showErrorAlert } from '@helpers/sweetAlert';

const useFetchBatch = (batchId) => {
    const [batch, setBatch] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBatch = async () => {
        if (!batchId) return;
        setLoading(true);
        try {
            const data = await getBatch(batchId);
            setBatch(data);
        } catch (error) {
            showErrorAlert('Error', 'No se pudo cargar el lote');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBatch();
    }, [batchId]);

    return { batch, loading, fetchBatch };
};

export { useFetchBatch };
