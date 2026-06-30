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
    <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-5 shadow-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-100 uppercase">Active Workers</h2>
        <span className="flex h-5 items-center rounded-full bg-zinc-800/80 px-2 text-xs font-medium text-zinc-300">
          {workers.length} {workers.length === 1 ? 'Node' : 'Nodes'}
        </span>
      </div>

      {workers.length === 0 ? (
        <div className="flex h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800/50 bg-zinc-950/20">
          <p className="text-sm text-zinc-500">No active workers</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {workers.map((worker) => {
            const secondsAgo = Math.floor((Date.now() - Number(worker.lastSeen)) / 1000);
            const isOnline = secondsAgo < 60; // Example status check

            return (
              <div key={worker.id} className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-3 hover:bg-zinc-800/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    {isOnline && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-20"></span>
                    )}
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{worker.id}</p>
                    <p className="text-xs text-zinc-500">Heartbeat {secondsAgo}s ago</p>
                  </div>
                </div>
                <div className="rounded bg-zinc-800/50 px-2 py-1 text-xs font-medium text-zinc-400 border border-zinc-700/30">
                  {isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
