import { pool } from "../config/postgres.js";

export async function getAnalytics(req, res) {
  try {
    const result = await pool.query(`
SELECT
    COUNT(*) AS total_jobs,

    COUNT(*) FILTER (WHERE status = 'completed') AS completed_jobs,

    COUNT(*) FILTER (WHERE status = 'failed') AS failed_jobs,

    COUNT(*) FILTER (WHERE status = 'active') AS active_jobs,

    COUNT(*) FILTER (WHERE status = 'waiting') AS waiting_jobs,

    ROUND(
    AVG(duration_ms) FILTER (WHERE duration_ms IS NOT NULL)
) AS average_duration,

    MIN(duration_ms) FILTER (WHERE duration_ms IS NOT NULL)
    AS fastest_job,

    MAX(duration_ms) FILTER (WHERE duration_ms IS NOT NULL)
    AS slowest_job

FROM jobs;
    `);

    res.json({
      success: true,
      analytics: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
}
