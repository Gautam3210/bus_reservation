import type { Request, Response } from "express";
import { Bus } from "../models/Bus.js";
import { Booking } from "../models/Booking.js";

// Fetch all buses
export const getAllBuses = async (req: Request, res: Response) => {
  const buses = await Bus.findAll();
  res.json({ success: true, data: buses });
};

// Search buses by source & destination
export const searchBuses = async (req: Request, res: Response) => {
  const { source, destination } = req.query;
  if (!source || !destination)
    return res.status(400).json({ success: false, message: "Source & destination required" });

  const buses = await Bus.findAll({
    where: {
      source: source.toString(),
      destination: destination.toString(),
    },
  });

  res.json({ success: true, data: buses });
};

// Book a bus
// Book a bus
export const bookBus = async (req: Request, res: Response) => {
  const { busId, passengerName, seats } = req.body;

  if (!busId || !passengerName || !seats)
    return res.status(400).json({ success: false, message: "All fields required" });

  const bus: any = await Bus.findByPk(busId);
  if (!bus) return res.status(404).json({ success: false, message: "Bus not found" });

  if (bus.seatsAvailable < seats)
    return res.status(400).json({ success: false, message: "Not enough seats available" });

  bus.seatsAvailable -= seats;
  await bus.save();

  const booking = await Booking.create({
    busId,
    passengerName,
    seatsBooked: seats,
    totalFare: Number(bus.fare) * seats,
  });

  res.json({
    success: true,
    message: "Booking confirmed!",
    data: {
      ...booking.toJSON(),
      source: bus.source,
      destination: bus.destination,
      totalFare: booking.totalFare,
    },
  });
};

