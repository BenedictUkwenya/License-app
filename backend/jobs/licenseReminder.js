const cron = require('node-cron');
const License = require('../models/license'); // Adjust path if needed
const User = require('../models/User'); // Adjust path if needed
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure you have a .env file with EMAIL_USER and EMAIL_PASS

// Connect to MongoDB if not already connected
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or another email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to check for expiring licenses
const checkExpiringLicenses = async () => {
    try {
        console.log('Checking for expiring licenses...');

        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7); // 7 days from today

        // Find licenses expiring within the next 7 days
        const expiringLicenses = await License.find({
            expiryDate: { $gte: today, $lte: nextWeek }
        }).populate('user'); // Assuming 'user' is a reference to the User model

        console.log(`Found ${expiringLicenses.length} expiring licenses.`);

        if (expiringLicenses.length === 0) {
            console.log('No expiring licenses found.');
            return;
        }

        for (const license of expiringLicenses) {
            if (!license.user || !license.user.email) {
                console.warn(`Skipping license ${license._id} - No associated user email.`);
                continue;
            }

            const userEmail = license.user.email;
            console.log(`Sending reminder to: ${userEmail}`);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: `License Expiry Reminder: ${license.title}`,
                text: `Hello ${license.user.name || 'User'},\n\nYour license "${license.title}" is expiring on ${license.expiryDate.toDateString()}. Please renew it soon.\n\nRegards, \nLicenseApp`
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log(`Email sent successfully to ${userEmail}: ${info.response}`);
            } catch (emailError) {
                console.error(`Failed to send email to ${userEmail}:`, emailError);
            }
        }

    } catch (error) {
        console.error('Error checking licenses:', error);
    }
};

// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', checkExpiringLicenses, {
    scheduled: true,
    timezone: "Africa/Lagos" // Adjust as needed
});

// Run the function immediately for testing
//checkExpiringLicenses(); 

console.log('License reminder cron job scheduled.');
