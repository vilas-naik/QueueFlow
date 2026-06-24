import express from "express";
import {
  createJob,
  getJobs,
  getJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);

router.get("/", getJobs);

router.get("/:id", getJob);

export default router;