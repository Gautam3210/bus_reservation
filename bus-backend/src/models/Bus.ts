import  { Model, DataTypes } from "sequelize";
import  type {  Optional} from "sequelize";
import { sequelize } from "./db.js";

interface BusAttributes {
  id?: number;
  source: string;
  destination: string;
  seatsAvailable: number;
  fare: number;
}

interface BusCreationAttributes extends Optional<BusAttributes, "id"> {}

export class Bus
  extends Model<BusAttributes, BusCreationAttributes>
  implements BusAttributes
{
  declare id: number;
  declare source: string;
  declare destination: string;
  declare seatsAvailable: number;
  declare fare: number;

}

Bus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    source: DataTypes.STRING,
    destination: DataTypes.STRING,
    seatsAvailable: DataTypes.INTEGER,
    fare: DataTypes.DECIMAL(10, 2),
  },
  {
    sequelize,
    tableName: "buses",
    freezeTableName: true,
    timestamps: false,
  }
);
