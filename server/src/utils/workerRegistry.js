import { connection } from "../config/redis.js";

export async function sendHeartbeat(workerId) {
  await connection.hset(`worker:${workerId}`, {
    id: workerId,
    lastSeen: Date.now(),
  });

  // Expire automatically if the worker stops sending heartbeats
  await connection.expire(`worker:${workerId}`, 10);
}