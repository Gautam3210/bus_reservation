import { Router } from "express";
import { getAllBuses, searchBuses, bookBus } from "../controllers/busController.js";

const router = Router();

// GET all buses
router.get("/buses", getAllBuses);

// GET search buses
router.get("/buses/search", searchBuses);

// POST book a bus
router.post("/book", bookBus);

export default router;
