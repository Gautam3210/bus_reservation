import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("bus_reservation", "root", "gautam@3210", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
