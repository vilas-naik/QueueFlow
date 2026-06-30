import express from "express";
import jobRoutes from "./routes/jobRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import workerHeartbeat from "./routes/workerRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/workers", workerHeartbeat);
app.use("/api/history", historyRoutes);
app.use("/api/analytics", analyticsRoutes);

export default app;