"use strict";
import { EntitySchema } from "typeorm";

const OrderSchema = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    clientName: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    product: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    status: {
      type: "varchar",
      length: 50,
      nullable: false,
      default: "pendiente",
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
});

export default OrderSchema;
