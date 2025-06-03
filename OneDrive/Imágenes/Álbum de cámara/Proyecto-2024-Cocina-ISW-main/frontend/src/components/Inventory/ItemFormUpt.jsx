import React, { useState, useEffect } from 'react';

const ItemFormUpt = ({ itemToEdit, onSubmit }) => {
  const [itemData, setItemData] = useState({
    name: '',
    type: 'food',
    quantity: 1,
    expirationDate: '',
  });

  useEffect(() => {
    if (itemToEdit) {
      setItemData({
        name: itemToEdit.name,
        type: itemToEdit.type,
        quantity: itemToEdit.quantity,
        expirationDate: itemToEdit.expirationDate || '',
      });
    }
  }, [itemToEdit]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(itemToEdit.id, itemData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Nombre del Ítem:
        <input
          type="text"
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
      </label>
      <label>
        Tipo:
        <select
          value={itemData.type}
          onChange={(e) => setItemData({ ...itemData, type: e.target.value })}
        >
          <option value="food">Comida</option>
          <option value="utensil">Utensilio</option>
        </select>
      </label>
      <label>
        Cantidad:
        <input
          type="number"
          min="1"
          value={itemData.quantity}
          onChange={(e) =>
            setItemData({ ...itemData, quantity: parseInt(e.target.value, 10) })
          }
        />
      </label>
      {itemData.type === 'food' && (
        <label>
          Fecha de Expiración:
          <input
            type="date"
            value={itemData.expirationDate}
            onChange={(e) =>
              setItemData({ ...itemData, expirationDate: e.target.value })
            }
          />
        </label>
      )}
      <button type="submit">Actualizar Ítem</button>
    </form>
  );
};

export default ItemFormUpt;