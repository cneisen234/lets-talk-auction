// Everything time-based runs on Mio's clock (America/Detroit), never the
// visitor's. Sale dates are calendar dates in Mio; sale times are "HH:MM" in Mio.

export const TZ = "America/Detroit";

/** Today's calendar date in Mio as "YYYY-MM-DD", plus the minutes since midnight. */
export function mioNow(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** Whole calendar days from one "YYYY-MM-DD" to another. */
export function daysBetween(from: string, to: string) {
  const ms = Date.UTC(...ymd(to)) - Date.UTC(...ymd(from));
  return Math.round(ms / 86_400_000);
}

function ymd(d: string): [number, number, number] {
  const [y, m, day] = d.split("-").map(Number);
  return [y, m - 1, day];
}

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "2026-12-05" → { month: "December", short: "Dec", day: 5, weekday: "Saturday" } */
export function saleDateParts(date: string) {
  const d = new Date(Date.UTC(...ymd(date), 12));
  const f = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(d);
  return {
    month: f({ month: "long" }),
    short: f({ month: "short" }),
    day: d.getUTCDate(),
    weekday: f({ weekday: "long" }),
  };
}

/** "10:00" → "10:00", "08:30" → "8:30" */
export function clock(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")}`;
}
