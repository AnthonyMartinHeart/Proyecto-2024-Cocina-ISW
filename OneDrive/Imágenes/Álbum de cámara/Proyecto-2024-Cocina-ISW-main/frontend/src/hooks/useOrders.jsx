import { useState, useEffect } from 'react';
import { getOrders, addOrder, updateOrder, deleteOrder } from '@services/orders.service';

const useOrders = () => {
  const [orders, setOrders] = useState([]);  // Estado que almacena las órdenes
  const [isLoading, setIsLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);  // Estado de error

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);  // Suponiendo que la respuesta tiene los datos en `data`
        setIsLoading(false);  // Desactivar el estado de carga
      } catch (err) {
        setError('Error al cargar las órdenes');
        setIsLoading(false);
      }
    };

    fetchOrders();  // Llamamos a la función de carga
  }, []);  // Se ejecuta solo una vez al montar el componente

  const createOrder = async (orderData) => {
    try {
      const response = await addOrder(orderData);
      setOrders(prevOrders => [...prevOrders, response.data]);
    } catch (err) {
      setError('Error al agregar la orden');
    }
  };

  const updateOrderStatus = async (orderId, updatedData) => {
    try {
      const response = await updateOrder(orderId, updatedData);
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === response.data.id ? response.data : order
      ));
    } catch (err) {
      setError('Error al actualizar la orden');
    }
  };

  const deleteOrderById = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      setError('Error al eliminar la orden');
    }
  };

  return {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrderStatus,
    deleteOrderById,
  };
};

export default useOrders;
