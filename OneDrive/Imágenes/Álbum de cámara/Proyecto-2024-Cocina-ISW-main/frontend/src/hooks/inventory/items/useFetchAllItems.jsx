import { useEffect, useState } from 'react';
import { getItems } from '@services/itemBatch.service.js';
import { showErrorAlert } from '@helpers/sweetAlert';

const useFetchItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const data = await getItems();
            setItems(data);
        } catch (error) {
            showErrorAlert('Error', 'No se pudieron cargar los items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return { items, loading, fetchItems };
};

export { useFetchItems };
