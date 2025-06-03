import React, { useState } from 'react';
import { addOrder } from '../services/orderService';
import { showErrorAlert, showSuccessAlert } from '../utils/alerts';

const CreateOrder = () => {
  const [orderData, setOrderData] = useState({
    clientName: '',
    product: '',
    status: 'pendiente',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderData.clientName || !orderData.product) {
      showErrorAlert('Campos vacíos', 'Todos los campos son obligatorios.');
      return;
    }
    setLoading(true);
    try {
      const result = await addOrder(orderData);
      setMessage(`Orden creada exitosamente: ${result.clientName} - ${result.product}`);
      setOrderData({ clientName: '', product: '', status: 'pendiente' });
      showSuccessAlert('Orden Guardada', 'La orden ha sido guardada correctamente.');
    } catch (error) {
      showErrorAlert('Error', 'Hubo un error al guardar la orden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-order">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="clientName"
          value={orderData.clientName}
          onChange={handleInputChange}
          placeholder="Nombre del cliente"
          required
        />
        <input
          type="text"
          name="product"
          value={orderData.product}
          onChange={handleInputChange}
          placeholder="Producto"
          required
        />
        <select
          name="status"
          value={orderData.status}
          onChange={handleInputChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completada">Completada</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Crear Orden'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateOrder;
