import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from './orderService';  // Importar los servicios para obtener y eliminar órdenes

const OrderList = () => {
  const [orders, setOrders] = useState([]);  // Estado para almacenar las órdenes

  // Obtener las órdenes al cargar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();  // Llamada al servicio para obtener las órdenes
        setOrders(fetchedOrders);  // Actualizar el estado con las órdenes obtenidas
      } catch (error) {
        console.error('Error al obtener las órdenes:', error);  // Manejo de errores
      }
    };
    fetchOrders();  // Llamada a la función fetchOrders cuando el componente se monta
  }, []);

  // Manejar la eliminación de una orden
  const handleDeleteOrder = async (orderId) => {
    if (!orderId) {
      console.error('El ID de la orden es inválido');
      return;  // Si el ID es inválido, no se hace nada
    }

    // Confirmación antes de eliminar
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta orden?");
    if (!confirmDelete) return;

    try {
      // Asegúrate de que el `orderId` es el correcto antes de pasar al servicio de eliminación
      console.log('Eliminando orden con ID:', orderId);  // Asegúrate de que el ID está definido

      const response = await deleteOrder(orderId);  // Llamada al servicio para eliminar la orden
      console.log('Orden eliminada:', response);

      // Eliminar la orden de la lista de órdenes
      setOrders(orders.filter(order => order.id !== orderId)); 
    } catch (error) {
      console.error('Error al eliminar la orden:', error);  // Manejo de errores
    }
  };

  return (
    <div>
      <h1>Lista de Órdenes</h1>
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles.</p>  // Mensaje si no hay órdenes
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>{order.clientName} - {order.status}</p>
              <button onClick={() => handleDeleteOrder(order.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
