import "dotenv/config";
import app from "./app.js";
import { connection } from "./config/redis.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 QueueFlow API running on port ${PORT}`);
});

connection.on("connect", () => {
  console.log("✅ Redis Connected");
});

connection.on("error", (err) => {
  console.error("❌ Redis Error:", err.message);
});