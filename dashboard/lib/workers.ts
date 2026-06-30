import { api } from "./api";

export async function getWorkers() {
  const res = await api.get("/workers");
  return res.data.workers;
}