"use client";

import { useEffect, useState } from "react";
import { getMetrics } from "@/lib/metrics";
import { Metrics } from "@/types/metrics";

export default function QueueHealth() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetchMetrics();

    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  async function fetchMetrics() {
    try {
      const data = await getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error(err);
    }
  }

  const items = [
    {
      label: "Waiting",
      value: metrics?.waiting ?? 0,
      color: "bg-yellow-500",
    },
    {
      label: "Active",
      value: metrics?.active ?? 0,
      color: "bg-blue-500",
    },
    {
      label: "Completed",
      value: metrics?.completed ?? 0,
      color: "bg-green-500",
    },
    {
      label: "Failed",
      value: metrics?.failed ?? 0,
      color: "bg-red-500",
    },
    {
      label: "Delayed",
      value: metrics?.delayed ?? 0,
      color: "bg-orange-500",
    },
    {
      label: "Paused",
      value: metrics?.paused ?? 0,
      color: "bg-zinc-500",
    },
  ];

  return (
    <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-5 shadow-sm h-full">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-zinc-100 uppercase">Queue Health</h2>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-3 hover:bg-zinc-800/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              <p className="text-xs font-medium text-zinc-400">{item.label}</p>
            </div>
            <span className="text-xl font-semibold text-zinc-100">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
