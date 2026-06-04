
type ReportFilterKey = "all" | "pending" | "critical" | "resolved";

export function normalizeStatus(status?: string | null): ReportFilterKey {
  const normalized = (status || "").toLowerCase();
  if (normalized === "critical") return "critical";
  if (normalized === "resolved") return "resolved";
  if (normalized === "pending") return "pending";
  return "pending";
}

export function statusToSeverity(status?: string | null) {
  const normalized = normalizeStatus(status);
  if (normalized === "critical") return "critical" as const;
  if (normalized === "resolved") return "resolved" as const;
  return "pending" as const;
}

export function isStatusHigher(next: ReportFilterKey, current: ReportFilterKey) {
  return statusRank(next) > statusRank(current);
}

export function statusRank(status: ReportFilterKey) {
  if (status === "critical") return 3;
  if (status === "pending") return 2;
  return 1;
}

export function formatReasons(reasons: string[]) {
  if (reasons.length === 0) return "No report reason";
  if (reasons.length <= 2) return reasons.join(", ");
  return `${reasons.slice(0, 2).join(", ")} +${reasons.length - 2} more`;
}

export function formatTimeAgo(isoDate?: string | null) {
  if (!isoDate) return "";
  const now = Date.now();
  const timestamp = new Date(isoDate).getTime();
  if (Number.isNaN(timestamp)) return "";
  const diffSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (diffSeconds < 60) return "just now";
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks}w ago`;
}

export function formatDateTime(isoDate?: string | null) {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

export function isAfter(next?: string | null, current?: string | null) {
  if (!next) return false;
  if (!current) return true;
  return new Date(next).getTime() > new Date(current).getTime();
}

export function compareDatesDesc(a?: string | null, b?: string | null) {
  const aTime = a ? new Date(a).getTime() : 0;
  const bTime = b ? new Date(b).getTime() : 0;
  return bTime - aTime;
}