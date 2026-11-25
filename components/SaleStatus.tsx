"use client";

// Live sale status on Mio's clock: the bidder card's countdown and the
// header's chip. The server renders without a status (it can't know the
// visitor's moment), and the browser fills it in, so the clock never causes a
// hydration mismatch. Rechecks every minute.

import { useSyncExternalStore } from "react";
import { daysBetween, mioNow, toMinutes } from "@/lib/time";

type SaleTimes = { date: string; doors: string; start: string };

export type Status =
  | { kind: "countdown"; text: string }
  | { kind: "today"; text: string }
  | { kind: "live"; text: string }
  | { kind: "over"; text: string };

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}
// One snapshot per minute, so React sees a stable value between ticks.
const minuteStamp = () => Math.floor(Date.now() / 60_000);
const serverStamp = () => null;

export function statusFor(sale: SaleTimes, now = new Date()): Status {
  const { date, minutes } = mioNow(now);
  const days = daysBetween(date, sale.date);
  if (days > 1) return { kind: "countdown", text: `In ${days} days` };
  if (days === 1) return { kind: "countdown", text: "Tomorrow" };
  if (days < 0) return { kind: "over", text: "Sold" };
  if (minutes < toMinutes(sale.doors)) return { kind: "today", text: "Today" };
  if (minutes < toMinutes(sale.start)) return { kind: "live", text: "Doors open" };
  return { kind: "live", text: "Bidding now" };
}

/** The sale's status right now in Mio, or null before the browser takes over. */
export function useSaleStatus(sale: SaleTimes): Status | null {
  const stamp = useSyncExternalStore(subscribe, minuteStamp, serverStamp);
  return stamp === null ? null : statusFor(sale, new Date(stamp * 60_000));
}

/** Just the status words, for places that render their own frame. */
export function StatusText({ sale, className = "" }: { sale: SaleTimes; className?: string }) {
  const status = useSaleStatus(sale);
  // Reserve the line while the server renders, so nothing shifts.
  return (
    <span className={className} style={{ visibility: status ? "visible" : "hidden" }}>
      {status?.text ?? "In 0 days"}
    </span>
  );
}
