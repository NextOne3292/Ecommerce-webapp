import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = 3000;

// Middleware to read JSON data
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect database
connectDB();