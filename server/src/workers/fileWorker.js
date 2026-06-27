import os from "os";

import { workerId } from "../config/worker.js";
console.log(`👷 Worker ${workerId} started`);

import { Worker } from "bullmq";
import { connection } from "../config/redis.js";

const worker = new Worker(
  "file-processing",
  async (job) => {
    console.log(`👷 ${workerId} processing Job ${job.id}`);
    console.log(`📄 File: ${job.data.filename}`);

    // //simulating failure
    // if (job.data.filename === "fail.pdf") {
    //   throw new Error("Simulated failure");
    // }

    await job.updateProgress(0);

    // simulating processing
    await new Promise((resolve) => setTimeout(resolve, 5000));
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
  },
);

worker.on("completed", async (job) => {
  console.log(`
==============================
✅ JOB COMPLETED
------------------------------
Worker_ID : ${workerId}
ID        : ${job.id}
File      : ${job.data.filename}
Result    : ${JSON.stringify(job.returnvalue)}
==============================
`);
});

worker.on("failed", (job, err) => {
  console.log(`
==============================
❌ JOB FAILED
------------------------------
Worker_ID : ${workerId}s
ID        : ${job?.id}
File      : ${job?.data?.filename}
Attempts  : ${job?.attemptsMade}/${job?.opts.attempts}
Reason    : ${err.message}
==============================
`);
});
