import { useEffect, useState } from 'react';
import { getAllBatches } from '@services/batch.service.js';
import { showErrorAlert } from '@helpers/sweetAlert';

const useFetchAllBatches = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBatches = async () => {
        setLoading(true);
        try {
            const data = await getAllBatches();
            setBatches(data);
        } catch (error) {
            showErrorAlert('Error', 'No se pudieron cargar los lotes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    return { batches, loading, fetchBatches };
};

export { useFetchAllBatches };
