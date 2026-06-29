import { pool } from "../config/postgres.js";

export async function getHistory(req, res) {
  try {
    const result = await pool.query(`
      SELECT *
      FROM jobs
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      jobs: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
}