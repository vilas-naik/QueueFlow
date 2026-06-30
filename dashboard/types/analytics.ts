export interface Analytics {
  total_jobs: number;
  completed_jobs: number;
  failed_jobs: number;
  active_jobs: number;
  waiting_jobs: number;
  average_duration: number;
  fastest_job: number;
  slowest_job: number;
}