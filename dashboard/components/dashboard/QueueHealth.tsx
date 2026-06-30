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
    <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6">
      <h2 className="mb-5 text-xl font-semibold">Queue Health</h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-800/50 transition"
          >
            {" "}
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${item.color}`} />
              <p className="font-medium">{item.label}</p>{" "}
            </div>
            <span className="rounded-md bg-zinc-800 px-3 py-1 text-sm font-semibold">{item.value}</span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
