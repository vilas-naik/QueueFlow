"use client";

import { useEffect, useState } from "react";
import { Worker } from "@/types/worker";
import { getWorkers } from "@/lib/workers";

export default function Workers() {
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    fetchWorkers();

    const interval = setInterval(fetchWorkers, 5000);

    return () => clearInterval(interval);
  }, []);

  async function fetchWorkers() {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
      <h2 className="mb-5 text-xl font-semibold">Active Workers</h2>

      {workers.length === 0 ? (
        <p className="text-zinc-400">No active workers.</p>
      ) : (
        <div className="space-y-3">
          {workers.map((worker) => {
            const secondsAgo = Math.floor((Date.now() - Number(worker.lastSeen)) / 1000);

            return (
              <div key={worker.id} className="rounded-lg bg-zinc-800 p-4">
                <div className="flex flex-col items-start gap-1">
                  <div className="mx-auto mb-3 h-3 w-3 rounded-full bg-green-500 animate-pulse" />

                  <p className="text-lg font-semibold">{worker.id}</p>

                  <p className="mt-1 text-sm text-green-400">Online</p>

                  <p className="mt-3 text-xs text-zinc-500">Updated {secondsAgo}s ago</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
