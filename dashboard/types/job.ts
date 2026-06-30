export interface Job {
  id: string;
  bullmq_job_id: string;
  filename: string;
  status: string;
  priority: number;
  worker_id: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  duration_ms: number | null;
  failure_reason: string | null;
}

export interface HistoryResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  jobs: Job[];
}