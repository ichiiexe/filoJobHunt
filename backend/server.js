import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js"; // Import auth route

dotenv.config();
console.log("Environment variables loaded:", process.env.PORT); // Debugging line to check if env variables are loaded
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
