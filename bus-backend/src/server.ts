import  express from "express";
import type  { Request, Response } from "express"
import cors from "cors";
import busRoutes from "./routes/busRoutes.js";
import { sequelize } from "./models/db.js";
import { Bus } from "./models/Bus.js";


const app = express();
const PORT = 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables synced!");
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());
app.use(express.json());

// Basic Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("Bus Reservation Backend Running Successfully!");
});

app.use("/api", busRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
