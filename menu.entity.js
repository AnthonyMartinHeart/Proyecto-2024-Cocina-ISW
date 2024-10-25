"use strict";
import { EntitySchema } from "typeorm";

const MenuSchema = new EntitySchema({
  name: "Menu",
  tableName: "menus",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    descripcion: {
      type: "text",
      nullable: false,
    },
    precio: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
    },
    disponible: {
      type: "boolean",
      default: true,
      nullable: false,
    },
  },
});

export default MenuSchema;