import os from "os";
import { workerId } from "../config/worker.js";

import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { sendHeartbeat } from "../utils/workerRegistry.js";
import { pool } from "../config/postgres.js";

console.log(`👷 Worker ${workerId} started`);

sendHeartbeat(workerId);
setInterval(() => {
  sendHeartbeat(workerId);
}, 5000);

const worker = new Worker(
  "file-processing",
  async (job) => {
    const startedAt = new Date();

    console.log(`👷 ${workerId} processing Job ${job.id}`);
    console.log(`📄 File: ${job.data.filename}`);

    await pool.query(
      `
UPDATE jobs
SET
status=$1,
worker_id=$2,
started_at=$3
WHERE bullmq_job_id=$4
`,
      ["active", workerId, startedAt, job.id],
    );

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await job.updateProgress(100);

    const completedAt = new Date();
    const duration = completedAt.getTime() - startedAt.getTime();

    await pool.query(
      `
UPDATE jobs
SET
status=$1,
completed_at=$2,
duration_ms=$3
WHERE bullmq_job_id=$4
`,
      ["completed", completedAt, duration, job.id],
    );

    return {
      success: true,
      filename: job.data.filename,
      processedAt: completedAt.toISOString(),
      duration,
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

worker.on("failed", async (job, err) => {
  await pool.query(
    `
UPDATE jobs
SET
status=$1,
failure_reason=$2
WHERE bullmq_job_id=$3
`,
    ["failed", err.message, job.id],
  );

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