"use strict";
import { EntitySchema } from "typeorm";

const batchItemSchema = new EntitySchema({
  name: "BatchItem",
  tableName: "batch_items",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    type: {
      type: "enum",
      enum: ["food", "utensil"], // El tipo de elemento
      nullable: false,
    },
    quantity: {
      type: "int",
      nullable: false,
    },
    expirationDate: {
      type: "date",
      nullable: true, // Solo aplicable si es tipo comida
    },
  },
  relations: {
    batch: {
      type: "many-to-one",
      target: "PurchaseBatch", // Relación con el lote
      joinColumn: true,
    },
  },
});

export default batchItemSchema;