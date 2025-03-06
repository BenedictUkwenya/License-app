const express = require("express");
const {
    createLicense,
    getLicenses,
    updateLicense,
    deleteLicense
} = require("../controller/licenseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createLicense);
router.get("/", authMiddleware, getLicenses);
router.put("/:id", authMiddleware, updateLicense);
router.delete("/:id", authMiddleware, deleteLicense);

module.exports = router;
