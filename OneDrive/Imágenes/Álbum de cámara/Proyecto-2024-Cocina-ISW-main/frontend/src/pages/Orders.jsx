import React, { useState, useEffect } from 'react';
import OrderTable from '@components/OrderTable';
import OrderForm from '@components/OrderForm';
import OrderModal from '@components/OrderModal';
import { addOrder, deleteOrder, updateOrder, getOrders } from '@services/orders.service'; 
import '@styles/orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionType, setActionType] = useState('');

  // Crear una nueva orden
  const handleAddOrder = async (orderData) => {
    try {
      const { data: newOrder } = await addOrder(orderData);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  // Actualizar una orden
  const handleEditOrder = async (updatedData) => {
    try {
      const { data: updatedOrder } = await updateOrder(updatedData.id, updatedData);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
      );
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Eliminar una orden
  const handleDeleteOrder = async () => {
    try {
      if (selectedOrder) {
        await deleteOrder(selectedOrder.id);
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== selectedOrder.id));
        setIsModalOpen(false);
        setSelectedOrder(null);
      } else {
        console.error('No order selected for deletion.');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Cargar las órdenes al montar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="main-container">
      <h1>Gestión de Órdenes</h1>

      {/* Tabla de Órdenes */}
      <OrderTable
        orders={orders}
        onEdit={(order) => {
          setSelectedOrder(order);
          setActionType('editar');
        }}
        onDelete={(order) => {
          setSelectedOrder(order);
          setActionType('eliminar');
          setIsModalOpen(true);
        }}
      />

      {/* Formulario para Crear y Editar Órdenes */}
      <OrderForm
        orderData={selectedOrder}
        onSubmit={selectedOrder ? handleEditOrder : handleAddOrder}
      />

      {/* Modal de Confirmación de eliminación */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteOrder}
        action={actionType}
      />
    </div>
  );
};

export default Orders;
