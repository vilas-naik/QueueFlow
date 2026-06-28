import express from "express";
import { getQueueMetrics } from "../controllers/metricsController.js";

const router = express.Router();

router.get("/", getQueueMetrics);

export default router;