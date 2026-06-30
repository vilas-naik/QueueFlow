import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  color,
}: MetricCardProps) {
  return (
    <Card className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400">{title}</p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              {value}
            </h2>
          </div>

          <div className={`rounded-xl p-3 ${color}`}>
            <Icon size={28} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}