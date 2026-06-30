import { api } from "./api";
import { HistoryResponse } from "@/types/job";

export async function getHistory(
    page = 1,
    limit = 10,
    status?: string,
    worker?: string
): Promise<HistoryResponse> {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (status) params.append("status", status);

    if (worker) params.append("worker", worker);

    const res = await api.get(`/history?${params}`);

    return res.data;
}