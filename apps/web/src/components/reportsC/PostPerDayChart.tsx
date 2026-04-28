import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PostStat {
  day: string;
  total_posts: number;
}

interface Props {
  data?: PostStat[];
  endpoint?: string;
}

export default function PostsPerDayChart({ data: propData, endpoint }: Props) {
  const [data, setData] = useState<PostStat[]>(propData ?? []);
  const [loading, setLoading] = useState<boolean>(!propData);

  useEffect(() => {
    if (propData) return;
    fetch(endpoint ?? "/api/stats/posts-per-day")
      .then((r) => r.json())
      .then((rows: { day: string; total_posts: number }[]) => {
        const formatted: PostStat[] = rows.map((r) => ({
          day: new Date(r.day).toLocaleDateString("es", { month: "short", day: "numeric" }),
          total_posts: Number(r.total_posts),
        }));
        setData(formatted);
        setLoading(false);
      });
  }, [endpoint, propData]);

  if (loading) return <p style={{ color: "#888", fontSize: 14 }}>Cargando...</p>;

  const max = Math.max(...data.map((d) => d.total_posts));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: "#888" }}
          axisLine={false}
          tickLine={false}
          interval={1}
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
          formatter={(v) => [v, "Posts"]}
          cursor={{ fill: "rgba(29,158,117,0.06)" }}
        />
        <Bar dataKey="total_posts" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.total_posts === max ? "#1d9e75" : "rgba(29,158,117,0.55)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}