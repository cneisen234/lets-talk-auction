// The barn's kit: the pieces every page is built from, all from Auction Acres
// and how a sale runs there.
//   ChantBand     the auctioneer's call as a tilted band (decoration only)
//   NailedPrint   a matted photo print hung on the barn wall by one nail
//   PaintedBoard  a section label painted on a board and nailed up
//   Ledger, LotRow  the clerk's ledger: red margin rule, lot number, snapshot
//   SoldStamp     the clerk's SOLD stamp, for sales that are over

import Image from "next/image";
import type { ReactNode } from "react";

/* ---- Chant band ---------------------------------------------------------- */

type Chant = ({ call: string } | { bid: string })[];

const DEFAULT_CHANT: Chant = [
  { call: "do I hear" },
  { bid: "ten" },
  { call: "ten, now" },
  { bid: "fifteen" },
  { call: "who’ll go" },
  { bid: "twenty" },
  { call: "twenty, now" },
  { bid: "twenty-five" },
  { call: "going once, going twice" },
  { bid: "sold!" },
  { call: "do I hear" },
  { bid: "ten" },
  { call: "ten, now" },
  { bid: "fifteen" },
];

/** The auctioneer's chant, tone-on-tone, oversized and cropped by the band so
 *  it reads as texture, never as information: bids are spelled out (no
 *  numerals that could pass for prices) and it's hidden from screen readers.
 *  It tilts across the seam between two sections; the wrapper clips it
 *  sideways so the page never scrolls horizontally. */
export function ChantBand({ chant = DEFAULT_CHANT, className = "" }: { chant?: Chant; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative z-10 ${className}`} style={{ overflowX: "clip" }}>
      <div
        className="relative -mx-10 h-[58px] overflow-hidden bg-barn-red md:h-[68px]"
        style={{
          transform: "rotate(-1.6deg)",
          borderTop: "3px double var(--brass-lit)",
          borderBottom: "3px double var(--brass-lit)",
        }}
      >
        <div className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-6 whitespace-nowrap">
          {chant.map((c, i) =>
            "bid" in c ? (
              <span
                key={i}
                // Young Serif's capitals sit high in their line box; nudge them
                // down so they're centered in the band, cropped evenly.
                className="relative top-[0.05em] font-display text-[4rem] uppercase md:text-[4.9rem]"
                style={{ lineHeight: 0.8, color: "color-mix(in srgb, var(--lit-wall) 20%, var(--barn-red))" }}
              >
                {c.bid}
              </span>
            ) : (
              <span
                key={i}
                className="font-hand text-[2.9rem] md:text-[3.4rem]"
                style={{ lineHeight: 0.8, color: "color-mix(in srgb, var(--lit-wall) 13%, var(--barn-red))" }}
              >
                {c.call}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- Nailed print -------------------------------------------------------- */

export function NailedPrint({
  src,
  alt,
  sizes,
  ratio = "4 / 3",
  tilt = 0.8,
  className = "",
  preload = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  ratio?: string;
  tilt?: number;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={`relative bg-lit-wall p-[7px] ${className}`} style={{ transform: `rotate(${tilt}deg)` }}>
      <span className="nail left-1/2 -top-[3px] -ml-[3px]" />
      <div className="border border-brass p-[3px]">
        <div className="relative w-full" style={{ aspectRatio: ratio }}>
          <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
        </div>
      </div>
    </div>
  );
}

/* ---- Painted board ------------------------------------------------------- */

export function PaintedBoard({ children, as: Tag = "h2" }: { children: ReactNode; as?: "h2" | "h3" | "p" }) {
  return (
    <Tag className="painted-board label" style={{ fontSize: "0.8rem" }}>
      <span className="nail left-[7px] top-1/2 -mt-[3px]" />
      <span className="nail right-[7px] top-1/2 -mt-[3px]" />
      {children}
    </Tag>
  );
}

/* ---- Ledger -------------------------------------------------------------- */

/** The clerk's ledger sheet: ruled rows and a red margin rule. */
export function Ledger({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative border border-rule bg-ledger text-left ${className}`}>
      <span aria-hidden="true" className="absolute inset-y-0 left-[3.6rem] border-l-[1.5px] border-barn-red/70 md:left-[4.25rem]" />
      {children}
    </div>
  );
}

/** A ledger of plain lines, a diamond in the margin for each (terms, what's
 *  selling), with an optional heading line in red. */
export function BulletLedger({ title, items, className = "" }: { title?: string; items: readonly string[]; className?: string }) {
  return (
    <Ledger className={`py-1 ${className}`}>
      {title ? (
        <h3 className="border-b border-rule py-3 pl-[4.4rem] pr-4 text-left md:pl-[5.1rem]">
          <span className="label text-barn-red">{title}</span>
        </h3>
      ) : null}
      <ul>
        {items.map((item) => (
          <li key={item} className="flex items-baseline border-b border-rule py-2.5 pr-4 last:border-b-0">
            <span aria-hidden="true" className="w-[3.6rem] flex-none text-center text-[0.55rem] text-barn-red/70 md:w-[4.25rem]">
              ◆
            </span>
            <span className="pl-3 leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </Ledger>
  );
}

/** One lot: its number in the margin, a snapshot clipped on, and its name. */
export function LotRow({ lot, name, photo, alt, tilt = 0 }: { lot: number; name: string; photo: string; alt: string; tilt?: number }) {
  return (
    <div className="flex items-center gap-4 border-b border-rule py-3 pr-4 last:border-b-0 md:gap-5">
      <span className="w-[3.6rem] flex-none text-center font-display text-xl text-barn-red md:w-[4.25rem] md:text-2xl">{lot}</span>
      <span className="relative h-[68px] w-[68px] flex-none border border-rule bg-ledger p-1 md:h-[84px] md:w-[84px]" style={{ transform: `rotate(${tilt}deg)` }}>
        <span className="relative block h-full w-full">
          <Image src={photo} alt={alt} fill sizes="84px" className="object-cover" />
        </span>
      </span>
      <span className="min-w-0 flex-1 font-label text-[1.05rem] font-semibold leading-snug text-rafter md:text-lg">{name}</span>
    </div>
  );
}

/* ---- SOLD stamp ---------------------------------------------------------- */

export function SoldStamp({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const scale = {
    sm: "px-1.5 pt-0.5 text-[0.8rem] bg-ledger/85",
    md: "px-3 pb-0.5 pt-1 text-xl",
    lg: "border-[3px] px-4 pb-1 pt-1.5 text-3xl bg-ledger/90",
  }[size];
  return (
    <span
      className={`inline-block border-2 border-barn-red font-display uppercase leading-tight tracking-[0.12em] text-barn-red opacity-90 ${scale} ${className}`}
      style={{ transform: "rotate(-8deg)" }}
    >
      Sold
    </span>
  );
}
