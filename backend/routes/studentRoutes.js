import express from "express";
import { getAllStudents, getProfile } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.get("/", protect, authorizeRoles("teacher"), getAllStudents);
router.get("/profile", protect, getProfile);

export default router;
