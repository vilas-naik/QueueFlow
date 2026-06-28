import { connection } from "../config/redis.js";

export async function getWorkers(req, res) {
  try {
    const keys = await connection.keys("worker:*");

    const workers = await Promise.all(
      keys.map(async (key) => {
        return await connection.hgetall(key);
      })
    );

    res.json({
      success: true,
      workers,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch workers",
    });
  }
}