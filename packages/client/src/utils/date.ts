/**
 * Formats an ISO 8601 timestamp into a human-readable string.
 * Example: "Apr 6, 2026 at 12:00 AM"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats an ISO 8601 timestamp with time included.
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
