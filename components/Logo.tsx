// The Lets Talk Auction mark, "the call": "Lets" in Young Serif with "Talk"
// called out in the auctioneer's hand, over AUCTION held between double rules.
// Approved as refinement A1 (2026-11-25). Drawn from outlined paths
// (logo-paths.ts) so it looks identical everywhere, fonts or no fonts.
//
// Sized in em, like type: the font-size on the wrapper is the size of
// AUCTION, so `text-[1.5rem]` or `size="1.5rem"` scales the whole lockup.
// tone="light" sits on the lit wall or paper; tone="dark" on timber.
// `place` drops the "Mio · Michigan" line where it would be too small to read.

import { LOGO_CALL, LOGO_INK, LOGO_PLACE, LOGO_VIEWBOX as vb } from "./logo-paths";

type Props = {
  tone?: "light" | "dark";
  place?: boolean;
  className?: string;
  /** Size of AUCTION; everything scales from it. Or size it with a text-[…]
   *  class (for responsive sizes) and leave this out. */
  size?: string;
};

export default function Logo({ tone = "light", place = true, className = "", size }: Props) {
  const ink = tone === "light" ? "var(--timber)" : "var(--lit-wall)";
  const call = tone === "light" ? "var(--barn-red)" : "var(--brass-lit)";
  const small = tone === "light" ? "var(--timber)" : "var(--brass-lit)";
  const h = place ? vb.hPlace : vb.hShort;

  return (
    <span className={`inline-block leading-none ${className}`} style={{ fontSize: size }}>
      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${h}`}
        role="img"
        aria-label="Lets Talk Auction"
        className="block h-auto"
        style={{ width: `${vb.w / 100}em` }}
      >
        <path fill={ink} d={LOGO_INK} />
        <path fill={call} d={LOGO_CALL} />
        {place ? <path fill={small} d={LOGO_PLACE} /> : null}
      </svg>
    </span>
  );
}
