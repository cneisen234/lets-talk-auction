import type { Metadata } from "next";
import Link from "next/link";
import { lta } from "@/lib/lets-talk-auction";
import { featuredSale } from "@/lib/sales";
import BidderCard from "@/components/BidderCard";
import FacilityIcon from "@/components/FacilityIcon";
import { BulletLedger, ChantBand, NailedPrint, PaintedBoard } from "@/components/Barn";

export const metadata: Metadata = {
  title: "Visit",
  description: "Auction Acres, at the corner of M-33 and Perry Creek Rd. between Mio and Fairview, Michigan.",
};

// Finding Auction Acres: where it is (in their words), the map, what the
// auction house has, and what to know on sale day.

export default function VisitPage() {
  return (
    <>
      <section className="bg-timber text-lit-wall">
        <div className="container-x grid lg:grid-cols-2">
          <div className="flex flex-col justify-center pb-12 pt-12 lg:py-20 lg:pb-24 lg:pr-10">
            <p className="label text-brass-lit">{lta.corner}</p>
            <h1 className="mt-4 text-[3.2rem] leading-[1] sm:text-[4rem] lg:text-[4.6rem]">{lta.venue}</h1>
            <address className="mt-5 not-italic text-lg text-lit-wall/90">
              {lta.street}, {lta.city}, {lta.state} {lta.zip}
            </address>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={lta.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-cream label">
                Open in Maps
              </a>
              <a href={lta.phoneHref} className="btn btn-outline-cream label">
                {lta.phone}
              </a>
            </div>
          </div>
          <div className="barn-wall relative -mx-5 px-8 pb-20 pt-8 md:-mx-8 md:px-12 lg:mx-0 lg:border-l lg:border-black/25 lg:px-10 lg:pb-24 lg:pt-12">
            <NailedPrint
              src="/photos/barn-preview-wide.webp"
              alt="Inside Auction Acres, tables of antiques, furniture and collectibles set out for preview"
              sizes="(min-width: 1024px) 34vw, 90vw"
              tilt={0.7}
              preload
            />
          </div>
        </div>
      </section>

      <ChantBand className="-my-7 md:-my-8" />

      {/* ---- The map and their directions ---- */}
      <section className="container-x grid items-center gap-10 pb-16 pt-20 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-12 md:pb-20 md:pt-24">
        <div className="relative border border-rule bg-paper p-2.5">
          <span className="nail left-1/2 -top-[3px] -ml-[3px]" />
          <div className="border border-brass">
            <iframe
              src={lta.mapsEmbed}
              title={`Map to ${lta.venue}, ${lta.street}, ${lta.city}`}
              className="block aspect-[4/3] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <PaintedBoard>Getting here</PaintedBoard>
          <ul className="mt-7 space-y-4">
            {lta.directions.map((d) => (
              <li key={d} className="flex gap-3 text-lg leading-snug">
                <span aria-hidden="true" className="pt-1.5 text-[0.6rem] text-barn-red">
                  ◆
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- The auction house ---- */}
      <section className="pegboard py-16 md:py-20">
        <div className="container-x text-center">
          <PaintedBoard>Auction house</PaintedBoard>
          <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {lta.facility.map((f) => (
              <li key={f.icon} className="flex flex-col items-center border border-rule bg-ledger px-3 pb-5 pt-6">
                <FacilityIcon name={f.icon} className="h-12 w-12 text-timber" />
                <span className="mt-3 font-label text-[0.98rem] font-semibold leading-snug md:text-[1.05rem]">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Sale day ---- */}
      <section className="container-x grid items-start gap-12 py-16 md:grid-cols-[auto_1fr] md:gap-14 md:py-20">
        <div className="flex flex-col items-center gap-5 md:items-start">
          <PaintedBoard>Sale day</PaintedBoard>
          <Link href={`/sales/${featuredSale.slug}`} aria-label={`Next sale: ${featuredSale.title}`}>
            <BidderCard sale={featuredSale} className="-rotate-[3deg] transition-transform hover:-rotate-1" width="9.5rem" />
          </Link>
        </div>
        <div>
          <BulletLedger items={lta.terms} className="md:mt-[3.75rem]" />
        </div>
      </section>
    </>
  );
}
