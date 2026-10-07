const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
const MAX_TRACKED_IPS = 5000;

// In-memory sliding window per IP. On serverless hosts each instance keeps its own
// counters, so this is best-effort protection rather than a hard global cap.
const hits = new Map<string, number[]>();

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

/** Returns 0 if the request is allowed, otherwise the seconds until it can retry. */
export function checkRateLimit(ip: string, now = Date.now()) {
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] > WINDOW_MS) hits.delete(key);
    }
  }

  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
  }

  recent.push(now);
  hits.set(ip, recent);
  return 0;
}
