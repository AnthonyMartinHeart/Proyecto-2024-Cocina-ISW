import React, { useState } from 'react';

const ItemForm = ({ onSubmit }) => {
  const [itemType, setItemType] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    type: '',
    quantity: 1,
    expirationDate: '',
  });

  const handleTypeSelection = (type) => {
    setItemType(type);
    setNewItem({
      name: '',
      type: type,
      quantity: 1,
      expirationDate: type === 'food' ? '' : undefined,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(newItem);
  };

  return (
    <div>
      {itemType === null && (
        <div>
          <h2>Selecciona el tipo de item:</h2>
          <button onClick={() => handleTypeSelection('food')}>Comida</button>
          <button onClick={() => handleTypeSelection('utensil')}>Utensilio</button>
        </div>
      )}

      {itemType && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Nombre del Ítem:
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </label>
          <label>
            Cantidad:
            <input
              type="number"
              min="1"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })
              }
            />
          </label>

          {newItem.type === 'food' && (
            <label>
              Fecha de Expiración:
              <input
                type="date"
                value={newItem.expirationDate}
                onChange={(e) =>
                  setNewItem({ ...newItem, expirationDate: e.target.value })
                }
              />
            </label>
          )}

          <button type="submit">Crear Ítem</button>
        </form>
      )}
    </div>
  );
};

export default ItemForm;