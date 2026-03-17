import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import jobRoutes from "./src/routes/job.routes.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

dotenv.config();
console.log("Environment variables loaded:", process.env.PORT);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use(errorMiddleware);
await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
