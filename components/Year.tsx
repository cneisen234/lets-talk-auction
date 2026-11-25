"use client";

// The current year for the footer's copyright. Read in the browser: with Cache
// Components on, the server can't read the clock while prerendering.

import { useSyncExternalStore } from "react";

const noop = () => () => {};

export default function Year() {
  return <>{useSyncExternalStore(noop, () => new Date().getFullYear(), () => null)}</>;
}
