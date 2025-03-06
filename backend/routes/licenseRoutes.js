import express from "express";
import {
    createLicense,
    getLicenses,
    updateLicense,
    deleteLicense
} from "../controller/licenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createLicense);
router.get("/", authMiddleware, getLicenses);
router.put("/:id", authMiddleware, updateLicense);
router.delete("/:id", authMiddleware, deleteLicense);

export default router;
