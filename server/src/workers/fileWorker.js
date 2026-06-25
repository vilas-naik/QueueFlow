console.log("👷 Worker started");

import { Worker } from "bullmq";
import { connection } from "../config/redis.js";

const worker = new Worker(
  "file-processing",
  async (job) => {
    console.log(`📥 Processing Job #${job.id}`);
    console.log(`📄 File: ${job.data.filename}`);

    await job.updateProgress(0);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await job.updateProgress(25);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await job.updateProgress(50);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await job.updateProgress(75);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await job.updateProgress(100);

    return {
      success: true,
      filename: job.data.filename,
      processedAt: new Date().toISOString(),
    };
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(
    `❌ Job ${job?.id} failed (${job?.attemptsMade}/${job?.opts.attempts})`
  );

  console.log(err.message);
});