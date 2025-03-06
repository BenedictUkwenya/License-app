require('dotenv').config();
require('./jobs/licenseReminder'); // This starts the cron job
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes.js")
const licenseRoutes = require("./routes/licenseRoutes.js");

const { default: connectMongoDB } = require('./db/connectdb');

const app = express();
console.log("JWT SECRET:", process.env.JWT_SECRET);

// Middleware
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Enable CORS
app.use('/api/users', userRoutes);
app.use("/api/licenses", licenseRoutes);
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