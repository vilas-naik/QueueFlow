import { api } from "./api";

export async function getAnalytics() {
  const res = await api.get("/analytics");
  return res.data.analytics;
}