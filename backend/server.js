require("dotenv").config();
console.log("Dotenv loaded:", process.env);
require('./jobs/licenseReminder'); // This starts the cron job
const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes.js")
const licenseRoutes = require("./routes/licenseRoutes.js");

const connectMongoDB = require('./db/connectdb');

const app = express();
console.log("JWT SECRET:", process.env.JWT_SECRET);

//const __dirname = path.resolve()
// Middleware
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Enable CORS
app.use('/api/users', userRoutes);
app.use("/api/licenses", licenseRoutes);
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}
// Test Route
app.get('/', (req, res) => {
  res.send('Licenses API is running...');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('server is running')
    connectMongoDB()
})