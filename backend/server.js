import dotenv from "dotenv";
dotenv.config();
//console.log("Dotenv loaded:", process.env);
import './jobs/licenseReminder.js'; // This starts the cron job
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import licenseRoutes from "./routes/licenseRoutes.js";
import connectMongoDB from './db/connectdb.js';
//npm install --prefix frontend && npm run build --prefix frontend
const app = express();
console.log("JWT SECRET:", process.env.JWT_SECRET);

// Middleware
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Enable CORS
app.use('/api/users', userRoutes);
app.use("/api/licenses", licenseRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  })
}
// Test Route
app.get('/', (req, res) => {
  res.send('Licenses API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;

connectMongoDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});
