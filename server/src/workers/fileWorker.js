import { Worker } from "bullmq";
import { connection } from "../config/redis.js";

const worker = new Worker(
  "file-processing",
  async (job) => {
    await job.updateProgress(25);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    await job.updateProgress(50);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    await job.updateProgress(75);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    await job.updateProgress(100);

    return {
      success: true,
      filename: job.data.filename,
    };
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed`);
  console.log(err.message);
});