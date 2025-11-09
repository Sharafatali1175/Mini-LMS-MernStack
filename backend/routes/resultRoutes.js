
import express from "express";
import {
  addResult,
  getResults,
  getMyResults,
  updateResult,
  deleteResult,
} from "../controllers/resultController.js"; 
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("teacher"), addResult);
router.get("/", protect, authorize("teacher"), getResults);

router.get("/my", protect, authorize("student"), getMyResults);

router.put("/:id", protect, authorize("teacher"), updateResult);
router.delete("/:id", protect, authorize("teacher"), deleteResult);

export default router;
