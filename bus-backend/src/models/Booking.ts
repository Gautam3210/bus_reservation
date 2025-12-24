import { Model, DataTypes } from "sequelize";
import type {  Optional } from "sequelize";
import { sequelize } from "./db.js";
import { Bus } from "./Bus.js";

interface BookingAttributes {
  id?: number;
  busId: number;
  passengerName: string;
  seatsBooked: number;
  totalFare: number;
  bookedAt?: Date;
}

interface BookingCreationAttributes
  extends Optional<BookingAttributes, "id" | "bookedAt"> {}

export class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
{
    declare id: number;
    declare busId: number;
    declare passengerName: string;
    declare seatsBooked: number;
    declare totalFare: number;
    declare bookedAt: Date;

}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },    

    busId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
    passengerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seatsBooked: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
    totalFare: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    bookedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: "bookings",
    freezeTableName: true,
    timestamps: false,
  }
);

Booking.belongsTo(Bus, { foreignKey: "busId" });
