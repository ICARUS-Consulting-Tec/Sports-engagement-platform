import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MemberStat {
  month: string;
  new_members: number;
}

interface Props {
  data?: MemberStat[];
  endpoint?: string;
}

export default function MembersPerWeekChart({ data: propData, endpoint }: Props) {
  const [data, setData] = useState<MemberStat[]>(propData ?? []);
  const [loading, setLoading] = useState<boolean>(!propData);

  useEffect(() => {
    if (propData) return;
    fetch(endpoint ?? "/api/stats/members-per-month")
      .then((r) => r.json())
      .then((rows: { month: string; new_members: number }[]) => {
        const formatted: MemberStat[] = rows.map((r) => ({
          month: new Date(r.month).toLocaleString("es", { month: "short", year: "2-digit" }),
          new_members: Number(r.new_members),
        }));
        setData(formatted);
        setLoading(false);
      });
  }, [endpoint, propData]);

  if (loading) return <p style={{ color: "#888", fontSize: 14 }}>Cargando...</p>;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#888" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#888" }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip
          contentStyle={{ fontSize: 13, borderRadius: 8, border: "0.5px solid #e0e0e0" }}
          labelStyle={{ fontWeight: 500 }}
          formatter={(v) => [v, "Nuevos miembros"]}
        />
        <Line
          type="monotone"
          dataKey="new_members"
          stroke="#3266ad"
          strokeWidth={2}
          dot={{ r: 4, fill: "#3266ad", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}