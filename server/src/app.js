import express from "express";
import jobRoutes from "./routes/jobRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";  
import workerHeartbeat from "./routes/workerRoutes.js"

const app = express();

app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/workers",workerHeartbeat)

export default app;