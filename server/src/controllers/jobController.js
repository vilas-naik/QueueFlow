import { Job } from "bullmq";
import { fileQueue } from "../queues/fileQueue.js";
import { connection } from "../config/redis.js";
import { createJobRecord } from "../database/jobRepository.js";
import { pool } from "../config/postgres.js";
import crypto from "crypto";

export const createJob = async (req, res) => {
  try {
    const { filename, delay = 0, priority = 1 } = req.body;

    if (!filename || typeof filename !== "string") {
      return res.status(400).json({
        success: false,
        message: "filename is required",
      });
    }

    if (delay < 0) {
      return res.status(400).json({
        success: false,
        message: "delay cannot be negative",
      });
    }

    if (priority < 1) {
      return res.status(400).json({
        success: false,
        message: "priority must be at least 1",
      });
    }

    const job = await fileQueue.add(
      "process-file",
      {
        filename,
      },
      {
        attempts: 3,
        delay,
        priority,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    );

    await createJobRecord(job);
    await pool.query(
      `
  INSERT INTO jobs
  (
    id,
    bullmq_job_id,
    filename,
    status,
    priority
  )
  VALUES
  ($1,$2,$3,$4,$5)
`,
      [crypto.randomUUID(), job.id, filename, "waiting", priority],
    );

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      jobId: job.id,
      state: "waiting",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create job",
    });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.fromId(fileQueue, req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const state = await job.getState();

    res.json({
      id: job.id,
      state,
      progress: job.progress,
      data: job.data,
      priority: job.opts.priority,
      result: job.returnvalue,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await fileQueue.getJobs(["waiting", "active", "completed", "failed"]);

    const formatted = await Promise.all(
      jobs.map(async (job) => ({
        id: job.id,
        state: await job.getState(),
        progress: job.progress,
        priority: job.opts.priority,
        data: job.data,
      })),
    );

    res.json(formatted);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};