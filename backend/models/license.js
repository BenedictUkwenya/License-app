const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    expiryDate: { 
        type: Date, 
        required: [true, "Expiry date is required"] 
    }
}, { timestamps: true });

module.exports = mongoose.model("License", LicenseSchema);
