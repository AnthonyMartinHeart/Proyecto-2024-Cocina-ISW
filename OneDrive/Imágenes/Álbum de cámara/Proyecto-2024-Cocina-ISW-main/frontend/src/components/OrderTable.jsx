import React from 'react';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Producto</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.clientName}</td>
              <td>{order.product}</td>
              <td>{order.status}</td>
              <td>
                {/* Botón de edición */}
                <button onClick={() => onEdit(order)} className="edit-button">
                  ✏️ {/* Emoji de lápiz */}
                </button>

                {/* Botón de eliminación */}
                <button onClick={() => onDelete(order.id)} className="delete-button">
                  🗑️ {/* Emoji de papelera */}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No hay órdenes disponibles.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
