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

interface PostCategoryStat {
  category: string;
  total_posts: number;
}

interface Props {
  data?: PostCategoryStat[];
  endpoint?: string;
}

export default function PostsByCategoryChart({ data: propData, endpoint }: Props) {
  const [data, setData] = useState<PostCategoryStat[]>(propData ?? []);
  const [loading, setLoading] = useState<boolean>(!propData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propData) return;
    fetch(endpoint ?? "/api/stats/posts-by-category")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((rows: { category: string; total_posts: number }[]) => {
        setData(rows.map((r) => ({ ...r, total_posts: Number(r.total_posts) })));
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint, propData]);

  if (loading) return <p style={{ color: "#888", fontSize: 14 }}>Cargando...</p>;
  if (error) return <p style={{ color: "#e55", fontSize: 14 }}>Error: {error}</p>;

  const max = Math.max(...data.map((d) => d.total_posts));
  const chartHeight = Math.max(data.length * 44 + 40, 200);

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.07)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: "#888" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="category"
          tick={{ fontSize: 13, fill: "#555" }}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip
          contentStyle={{ fontSize: 13, borderRadius: 8, border: "0.5px solid #e0e0e0" }}
          labelStyle={{ fontWeight: 500 }}
          formatter={(v: number) => [v, "Posts"]}
          cursor={{ fill: "rgba(99,102,241,0.06)" }}
        />
        <Bar dataKey="total_posts" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.total_posts === max ? "#6366f1" : "rgba(99,102,241,0.5)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}