import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color?: string; // Keep optional so we don't break page.tsx before it's updated
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="border-zinc-800/50 bg-zinc-900/40 shadow-sm">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-zinc-100">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 border border-zinc-700/50">
          <Icon size={20} strokeWidth={2} />
        </div>
      </CardContent>
    </Card>
  );
}