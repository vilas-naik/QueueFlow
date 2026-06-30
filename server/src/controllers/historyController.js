import { pool } from "../config/postgres.js";

export async function getHistory(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { status, worker } = req.query;

    let query = `
      SELECT *
      FROM jobs
    `;

    let countQuery = `
      SELECT COUNT(*)
      FROM jobs
    `;

    const conditions = [];
    const values = [];

    if (status) {
      conditions.push(`status = $${values.length + 1}`);
      values.push(status);
    }

    if (worker) {
      conditions.push(`worker_id = $${values.length + 1}`);
      values.push(worker);
    }

    if (conditions.length > 0) {
      const whereClause = ` WHERE ${conditions.join(" AND ")}`;

      query += whereClause;
      countQuery += whereClause;
    }

    query += `
      ORDER BY created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

    values.push(limit);
    values.push(offset);

    const result = await pool.query(query, values);

    const countResult = await pool.query(countQuery, values.slice(0, values.length - 2));

    res.json({
      success: true,
      page,
      limit,
      total: Number(countResult.rows[0].count),
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
