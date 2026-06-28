import { fileQueue } from "../queues/fileQueue.js";

export const getQueueMetrics = async (req, res) => {
  try {
    const counts = await fileQueue.getJobCounts(
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed"
    );

    res.json({
      success: true,
      metrics: counts,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch queue metrics",
    });
  }
};