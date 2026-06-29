import { randomUUID } from "crypto";
import { pool } from "../config/postgres.js";

export async function createJobRecord(job) {
  const id = randomUUID();

  await pool.query(
    `
      INSERT INTO jobs (
        id,
        bullmq_job_id,
        filename,
        status,
        priority
      )
      VALUES ($1, $2, $3, $4, $5)
    `,
    [
      id,
      job.id,
      job.data.filename,
      "waiting",
      job.opts.priority ?? 1,
    ]
  );

  return id;
}