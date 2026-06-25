import { Queue } from "bullmq";
import { connection } from "../config/redis.js";

export const fileQueue = new Queue("file-processing", {
  connection,
});