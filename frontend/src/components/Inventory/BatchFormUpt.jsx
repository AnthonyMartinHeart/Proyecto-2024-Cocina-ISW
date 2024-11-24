import React, { useState, useEffect } from 'react';

const BatchFormUpt = ({ batchToEdit, onSubmit }) => {
  const [batch, setBatch] = useState({
    acquisitionDate: '',
    totalItems: 1,
  });

  useEffect(() => {
    if (batchToEdit) {
      setBatch({
        acquisitionDate: batchToEdit.acquisitionDate,
        totalItems: batchToEdit.totalItems,
      });
    }
  }, [batchToEdit]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const date = new Date(batch.acquisitionDate);
    date.setDate(date.getDate() + 1);
    const updatedDate = date.toISOString().split("T")[0];
    onSubmit(batchToEdit.id, { ...batch, acquisitionDate: updatedDate });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Fecha de Adquisición:
        <input
          type="date"
          value={batch.acquisitionDate}
          onChange={(e) =>
            setBatch({ ...batch, acquisitionDate: e.target.value })
          }
        />
      </label>
      <label>
        Total de Ítems:
        <input
          type="number"
          min="1"
          max="1000"
          value={batch.totalItems}
          onChange={(e) =>
            setBatch({ ...batch, totalItems: parseInt(e.target.value, 10) })
          }
        />
      </label>
      <button type="submit">Actualizar Lote</button>
    </form>
  );
};

export default BatchFormUpt;