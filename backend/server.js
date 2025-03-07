import dotenv from "dotenv";
dotenv.config();

import './jobs/licenseReminder.js'; // This starts the cron job
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import licenseRoutes from "./routes/licenseRoutes.js";
import connectMongoDB from './db/connectdb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
console.log("JWT SECRET:", process.env.JWT_SECRET);

// Middleware
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Enable CORS
app.use('/api/users', userRoutes);
app.use("/api/licenses", licenseRoutes);

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Test Route
app.get('/', (req, res) => {
  res.send('Licenses API is running...');
});

// Start Server Only After Database Connection is Successful
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectMongoDB();  // Wait until MongoDB connects
    console.log("MongoDB connected successfully!");
    
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed. Server not starting...", error);
    process.exit(1);  // Exit if DB connection fails
  }
};

startServer();
