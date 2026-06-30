"use client";

import { useState, useEffect } from "react";
import { getHistory } from "@/lib/history";
import { Job } from "@/types/job";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


export default function JobsTable() {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const data = await getHistory();
      setJobs(data.jobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/40 p-5 shadow-sm overflow-hidden">
      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-100 uppercase">Recent Jobs</h2>
      </div>

      <div className="rounded-lg border border-zinc-800/40 bg-zinc-950/30 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-zinc-800/40 bg-zinc-900/50">
              <TableHead className="text-zinc-400 font-medium h-9">Job ID</TableHead>
              <TableHead className="text-zinc-400 font-medium h-9">Status</TableHead>
              <TableHead className="text-zinc-400 font-medium h-9">Queue</TableHead>
              <TableHead className="text-zinc-400 font-medium h-9 text-right">Duration</TableHead>
              <TableHead className="text-zinc-400 font-medium h-9 text-right">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-zinc-500 py-8"
                >
                  No jobs found.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="border-zinc-800/30 hover:bg-zinc-800/40 transition-colors data-[state=selected]:bg-zinc-800/50"
                >
                  <TableCell className="font-mono text-xs text-zinc-300 py-3">{job.id}</TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant="outline"
                      className={`
                      capitalize text-[10px] px-2 py-0 h-4 
                      ${job.status === 'completed' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : ''}
                      ${job.status === 'active' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : ''}
                      ${job.status === 'failed' ? 'border-red-500/30 text-red-400 bg-red-500/10' : ''}
                      ${job.status === 'waiting' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' : ''}
                    `}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-400 py-3">{job.worker_id ?? "-"}</TableCell>
                  <TableCell className="text-sm text-zinc-400 text-right py-3">{job.duration_ms
                    ? `${job.duration_ms} ms`
                    : "-"}</TableCell>
                  <TableCell className="text-sm text-zinc-500 text-right py-3">{new Date(job.created_at).toLocaleString()}</TableCell>
                </TableRow>
              )))

            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
