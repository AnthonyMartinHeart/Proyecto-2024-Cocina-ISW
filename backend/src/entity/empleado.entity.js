"use strict";
import { EntitySchema } from "typeorm";

const EmpleadoSchema = new EntitySchema({
  name: "Employee",
  tableName: "Employees",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombreCompleto: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    rut: {
      type: "varchar",
      length: 12,
      nullable: false,
      unique: true,
    },
    email: {
      type: "varchar",
      length: 255,
      nullable: false,
      unique: true,
    },
    rol: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    cargo: {
      type: "varchar",
      length: 50,
      nullable: false,
      default: "desconocido",
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    fechaIngreso: {
      type: "date",
      nullable: false,
      default: () => "CURRENT_DATE", // Valor predeterminado para evitar NULL
    },
    horarioTrabajo: {
      type: "varchar",
      length: 100, // Ejemplo: "09:00-17:00"
      nullable: false,
      default: "09:00-17:00", // Valor predeterminado para evitar NULL
    },
    estado: {
      type: "varchar",
      length: 10,
      nullable: false,
      default: "activo", // "activo" o "inactivo"
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
  indices: [
    {
      name: "IDX_EMPLOYEE",
      columns: ["id"],
      unique: true,
    },
    {
      name: "IDX_EMPLOYEE_RUT",
      columns: ["rut"],
      unique: true,
    },
    {
      name: "IDX_EMPLOYEE_EMAIL",
      columns: ["email"],
      unique: true,
    },
  ],
});

export default EmpleadoSchema;
