import { Job } from "bullmq";
import { fileQueue } from "../queues/fileQueue.js";
import { connection } from "../config/redis.js";

export const createJob = async (req, res) => {
  try {
    const { filename } = req.body;

    const job = await fileQueue.add(
      "process-file",
      {
        filename,
      },
      {
        attempts: 3,
      }
    );

    res.status(201).json({
      success: true,
      jobId: job.id,
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
    const job = await Job.fromId(
      fileQueue,
      req.params.id
    );

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
    const jobs = await fileQueue.getJobs([
      "waiting",
      "active",
      "completed",
      "failed",
    ]);

    const formatted = await Promise.all(
      jobs.map(async (job) => ({
        id: job.id,
        state: await job.getState(),
        progress: job.progress,
        data: job.data,
      }))
    );

    res.json(formatted);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};