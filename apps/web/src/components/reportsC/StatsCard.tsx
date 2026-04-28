type StatsCardProps = {
  title?: string;
  value?: string | number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
};

function StatsCard({
  title = "MIEMBROS TOTALES",
  value = "1,284",
  changeLabel = "12 esta semana",
  trend = "up",
}: StatsCardProps) {
  const trendColor =
    trend === "down"
      ? "text-[#DC2626]"
      : trend === "neutral"
        ? "text-[#64748B]"
        : "text-[#22A95A]";

  const trendArrow = trend === "down" ? "↓" : trend === "neutral" ? "•" : "↑";

  return (
    <article className="flex min-h-[168px] w-full flex-col justify-between rounded-[18px] bg-[#F7F8FC] px-5 py-5 shadow-[0_6px_16px_rgba(15,23,42,0.04)]">
      <header>
        <h3 className="m-0 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3] md:text-[13px]">
          {title}
        </h3>
      </header>

      <div className="flex flex-1 flex-col justify-center gap-2">
        <p className="m-0 text-[34px] font-black leading-none tracking-[-0.04em] text-[#13294B] md:text-[38px]">
          {value}
        </p>

        <div className={`flex items-center gap-1.5 text-[14px] font-bold ${trendColor}`}>
          <span aria-hidden="true" className="text-[20px] leading-none">
            {trendArrow}
          </span>
          <span>{changeLabel}</span>
        </div>
      </div>
    </article>
  );
}

export default StatsCard;
