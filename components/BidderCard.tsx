// The bidder card: the numbered card bidders hold up in the barn, carrying the
// sale date where the bidder number would be. It's the site's "open sign":
// the line at the bottom counts down to the sale and turns to "Doors open" and
// "Bidding now" on the day (live, on Mio's clock).

import { saleDateParts, clock } from "@/lib/time";
import { StatusText } from "./SaleStatus";

type Props = {
  sale: { date: string; doors: string; start: string };
  className?: string;
  /** Width of the card; everything inside scales with it. */
  width?: string;
};

/** The same card, carrying a number instead of a date: "35+ years". */
export function TallyCard({ band, big, note, className = "", width = "9rem" }: { band: string; big: string; note: string; className?: string; width?: string }) {
  return (
    <div className={`border border-rule bg-paper text-center text-rafter ${className}`} style={{ width, fontSize: `calc(${width} / 8.5)` }}>
      <div className="label bg-barn-red py-[0.45em] text-lit-wall" style={{ fontSize: "0.7em" }}>
        {band}
      </div>
      <div className="font-display" style={{ fontSize: "3.6em", lineHeight: 1, marginTop: "0.2em" }}>
        {big}
      </div>
      <div className="mx-[0.7em] mt-[0.5em] border-t border-dashed border-rule pb-[0.75em] pt-[0.5em] text-weathered" style={{ fontSize: "0.85em", lineHeight: 1.4 }}>
        {note}
      </div>
    </div>
  );
}

export default function BidderCard({ sale, className = "", width = "8.5rem" }: Props) {
  const d = saleDateParts(sale.date);
  return (
    <div
      className={`border border-rule bg-paper text-center text-rafter ${className}`}
      style={{ width, fontSize: `calc(${width} / 8.5)` }}
    >
      <div className="label bg-barn-red py-[0.45em] text-lit-wall" style={{ fontSize: "0.7em" }}>
        {d.month}
      </div>
      <div className="font-display" style={{ fontSize: "4.6em", lineHeight: 0.95, marginTop: "0.12em" }}>
        {d.day}
      </div>
      <div className="mx-[0.7em] mt-[0.5em] border-t border-dashed border-rule pb-[0.6em] pt-[0.45em] text-weathered" style={{ fontSize: "0.8em", lineHeight: 1.45 }}>
        Doors {clock(sale.doors)}
        <br />
        Bids {clock(sale.start)}
      </div>
      <div className="label bg-ledger py-[0.45em] text-barn-red" style={{ fontSize: "0.7em", borderTop: "1px solid var(--rule)" }}>
        <StatusText sale={sale} />
      </div>
    </div>
  );
}
