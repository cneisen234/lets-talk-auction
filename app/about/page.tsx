import type { Metadata } from "next";
import Link from "next/link";
import { lta } from "@/lib/lets-talk-auction";
import { featuredSale } from "@/lib/sales";
import { TallyCard } from "@/components/BidderCard";
import { BulletLedger, ChantBand, NailedPrint } from "@/components/Barn";

export const metadata: Metadata = {
  title: "About",
  description: "A second-generation auction company in Mio, Michigan, serving all of Michigan and Northwest Ohio.",
};

// About, kept surface level (Chris, 2026-11-25): who they are in their own
// published words, their numbers on bidder cards, and photos of them at work.

const AT_WORK = [
  { src: "/photos/outdoor-crowd-rifle.webp", alt: "The auctioneer holds up a lot for a crowd of bidders at an outdoor sale", tilt: -1.2 },
  { src: "/photos/outdoor-decoy-tables.webp", alt: "Bidders look over rows of duck decoys at an outdoor sale", tilt: 0.9 },
  { src: "/photos/preview-tables-sportsman.webp", alt: "Preview tables set with decoys, reels, knives and framed prints", tilt: -0.6 },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-timber text-lit-wall">
        <div className="container-x grid lg:grid-cols-2">
          <div className="flex flex-col justify-center pb-12 pt-12 lg:py-20 lg:pb-24 lg:pr-10">
            <p className="label text-brass-lit">{lta.tagline}</p>
            {/* [profile] "From set-up to Sale, we'll do it all." */}
            <h1 className="mt-4 text-[3.2rem] leading-[1] sm:text-[4rem] lg:text-[4.6rem]">From set&#8209;up to&nbsp;sale.</h1>
          </div>
          <div className="barn-wall relative -mx-5 px-8 pb-20 pt-8 md:-mx-8 md:px-12 lg:mx-0 lg:border-l lg:border-black/25 lg:px-10 lg:pb-24 lg:pt-12">
            <NailedPrint
              src="/photos/stage-vintage-signs.webp"
              alt="An auctioneer holds up a lot at the stage, with vintage gas and tire signs on the wall behind"
              sizes="(min-width: 1024px) 34vw, 90vw"
              tilt={-0.8}
              preload
            />
          </div>
        </div>
      </section>

      <ChantBand className="-my-7 md:-my-8" />

      {/* ---- Their numbers, on bidder cards ---- */}
      <section className="pegboard pb-16 pt-20 md:pb-20 md:pt-24">
        <div className="container-x">
          <ul className="flex flex-wrap items-start justify-center gap-6 md:gap-10">
            <li className="-rotate-[3deg]">
              <TallyCard band="Years" big="35+" note="in the auction profession" />
            </li>
            <li className="rotate-[2deg] md:mt-6">
              <TallyCard band="Serving" big="MI" note="and Northwest Ohio" />
            </li>
          </ul>
          <BulletLedger title="Members of" items={lta.memberships} className="mx-auto mt-12 max-w-xl" />
        </div>
      </section>

      {/* ---- At work ---- */}
      <section className="barn-wall py-16 md:py-20">
        <div className="container-x grid gap-10 sm:grid-cols-3 sm:gap-6 md:gap-10">
          {AT_WORK.map((p) => (
            <NailedPrint key={p.src} src={p.src} alt={p.alt} sizes="(min-width: 640px) 30vw, 90vw" tilt={p.tilt} />
          ))}
        </div>
      </section>

      {/* ---- Their invitation ---- */}
      <section className="container-x py-16 text-center md:py-20">
        <p className="mx-auto max-w-2xl font-display text-[2rem] leading-tight md:text-[2.6rem]">{lta.invite}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/sales/${featuredSale.slug}`} className="btn btn-red label">
            See the next sale
          </Link>
          <Link href="/visit" className="btn btn-timber label">
            Directions
          </Link>
        </div>
      </section>
    </>
  );
}
