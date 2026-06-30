export interface Job {
  id: string;
  filename: string;
  status: string;
  worker_id: string | null;
  duration_ms: number | null;
  created_at: string;
}