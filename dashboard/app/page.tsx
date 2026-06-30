"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import MetricCard from "@/components/dashboard/MetricCard";
import Workers from "@/components/dashboard/Workers";

import { Analytics } from "@/types/analytics";
import { getAnalytics } from "@/lib/analytics";
import QueueHealth from "@/components/dashboard/QueueHealth";

import { Boxes, Activity, CircleX, Timer } from "lucide-react";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const [loading, setLoading] = useState(true);

  async function fetchAnalytics() {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">QueueFlow</h1>

          <p className="mt-3 text-zinc-400 text-lg">Distributed Job Processing Dashboard</p>
        </div>

        <div className="rounded-xl border border-green-700/40 bg-green-500/10 px-4 py-2">
          <span className="text-green-400 font-medium">🟢 System Healthy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Total Jobs"
          value={analytics?.total_jobs ?? 0}
          icon={Boxes}
          color="bg-blue-500/20 text-blue-400"
        />

        <MetricCard
          title="Active Jobs"
          value={analytics?.active_jobs ?? 0}
          icon={Activity}
          color="bg-green-500/20 text-green-400"
        />

        <MetricCard
          title="Failed Jobs"
          value={analytics?.failed_jobs ?? 0}
          icon={CircleX}
          color="bg-red-500/20 text-red-400"
        />

        <MetricCard
          title="Avg Duration"
          value={`${analytics?.average_duration ?? 0} ms`}
          icon={Timer}
          color="bg-yellow-500/20 text-yellow-400"
        />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <QueueHealth />
          </div>

          <div className="col-span-5">
            <Workers />
          </div>
        </div>
      </div>
    </div>
  );
}
