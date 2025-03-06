import License from "../models/license.js";

// CREATE A NEW LICENSE
const createLicense = async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Debugging
        console.log("Authenticated User:", req.user); // Debugging

        const { title, expiryDate } = req.body;
        if (!title || !expiryDate) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newLicense = new License({
            user: req.user.id,  // Assign user from auth middleware
            title,
            expiryDate
        });

        await newLicense.save();
        res.status(201).json(newLicense);
    } catch (error) {
        console.error("Error creating license:", error);
        res.status(500).json({ message: "Server error!", error: error.message });
    }
};

// GET ALL LICENSES FOR A USER
const getLicenses = async (req, res) => {
    try {
        const licenses = await License.find({ user: req.user.id }).sort({ expiryDate: 1 });
        res.json(licenses);
    } catch (error) {
        console.error("Error fetching licenses:", error);
        res.status(500).json({ message: "Server error!", error: error.message });
    }
};

// UPDATE LICENSE
const updateLicense = async (req, res) => {
    try {
        const { title, expiryDate } = req.body;
        const license = await License.findById(req.params.id);

        if (!license) {
            return res.status(404).json({ message: "License not found!" });
        }

        if (license.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized!" });
        }

        license.title = title || license.title;
        license.expiryDate = expiryDate || license.expiryDate;

        await license.save();
        res.json(license);
    } catch (error) {
        console.error("Error updating license:", error);
        res.status(500).json({ message: "Server error!", error: error.message });
    }
};

// DELETE LICENSE
const deleteLicense = async (req, res) => {
    try {
        const license = await License.findById(req.params.id);

        if (!license) {
            return res.status(404).json({ message: "License not found!" });
        }

        if (license.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized!" });
        }

        await license.deleteOne();
        res.json({ message: "License deleted successfully!" });
    } catch (error) {
        console.error("Error deleting license:", error);
        res.status(500).json({ message: "Server error!", error: error.message });
    }
};

export { createLicense, getLicenses, updateLicense, deleteLicense };
