"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

import MetricCard from "@/components/dashboard/MetricCard";
import Workers from "@/components/dashboard/Workers";
import QueueHealth from "@/components/dashboard/QueueHealth";
import JobsTable from "@/components/dashboard/JobsTable";

import { Analytics } from "@/types/analytics";
import { getAnalytics } from "@/lib/analytics";

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">QueueFlow</h1>
          <p className="mt-1 text-sm text-zinc-400">Distributed Job Processing Dashboard</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-20"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-400">System Healthy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Jobs"
          value={analytics?.total_jobs ?? 0}
          icon={Boxes}
        />

        <MetricCard
          title="Active Jobs"
          value={analytics?.active_jobs ?? 0}
          icon={Activity}
        />

        <MetricCard
          title="Failed Jobs"
          value={analytics?.failed_jobs ?? 0}
          icon={CircleX}
        />

        <MetricCard
          title="Avg Duration"
          value={`${analytics?.average_duration ?? 0} ms`}
          icon={Timer}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <QueueHealth />
        </div>

        <div className="lg:col-span-1">
          <Workers />
        </div>
      </div>

      <div className="mt-2">
        <JobsTable />
      </div>
    </div>
  );
}
