import type { Metadata } from "next";
import { lta } from "@/lib/lets-talk-auction";
import EstimateForm from "@/components/EstimateForm";
import { ChantBand, Ledger, NailedPrint, PaintedBoard, SoldStamp } from "@/components/Barn";

export const metadata: Metadata = {
  title: "Sell with us",
  description: "Estates, antiques, farm, commercial and more. Ask Lets Talk Auction for a free auction estimate.",
};

// Selling with them: their "Buying? Selling?" voice up top, how it works told
// as the call itself (going once, going twice, sold), what they sell, and the
// free-estimate sheet.

export default function SellPage() {
  return (
    <>
      <section className="bg-timber text-lit-wall">
        <div className="container-x grid lg:grid-cols-2">
          <div className="flex flex-col justify-center pb-12 pt-12 lg:py-20 lg:pb-24 lg:pr-10">
            <p className="label text-brass-lit">{lta.tagline}</p>
            <h1 className="mt-4 text-[3rem] leading-[1] sm:text-[3.8rem] lg:text-[4.4rem]">Selling? Let’s&nbsp;talk.</h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#estimate" className="btn btn-cream label">
                Free estimate
              </a>
              <a href={lta.phoneHref} className="btn btn-outline-cream label">
                {lta.phone}
              </a>
            </div>
          </div>
          <div className="barn-wall relative -mx-5 px-8 pb-20 pt-8 md:-mx-8 md:px-12 lg:mx-0 lg:border-l lg:border-black/25 lg:px-10 lg:pb-24 lg:pt-12">
            <NailedPrint
              src="/photos/outdoor-crowd-rifle.webp"
              alt="The auctioneer holds up a lot for a crowd of bidders at an outdoor sale"
              sizes="(min-width: 1024px) 34vw, 90vw"
              tilt={-0.7}
              preload
            />
          </div>
        </div>
      </section>

      <ChantBand className="-my-7 md:-my-8" />

      {/* ---- How it works, as the call ---- */}
      <section className="container-x pb-16 pt-20 md:pb-20 md:pt-24">
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {lta.sellSteps.map((s, i) => (
            <li key={s.call} className="pt-6" style={{ borderTop: "4px double var(--rafter)" }}>
              {i === lta.sellSteps.length - 1 ? (
                <SoldStamp size="lg" className="mt-1" />
              ) : (
                <h2 className="text-[2.2rem] md:text-[2.5rem]">{s.call}…</h2>
              )}
              <p className="mt-4 max-w-xs text-lg leading-relaxed">{s.line}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- What they sell ---- */}
      <section className="pegboard py-16 md:py-20">
        <div className="container-x text-center">
          <PaintedBoard>We sell</PaintedBoard>
          <Ledger className="mx-auto mt-8 max-w-3xl">
            <ul className="grid pl-[4.4rem] text-left sm:grid-cols-2 md:grid-cols-3 md:pl-[5.1rem]">
              {lta.specialties.map((s) => (
                <li key={s} className="border-b border-rule py-3 pr-4 font-label text-lg font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </Ledger>
        </div>
      </section>

      {/* ---- Free estimate ---- */}
      <section id="estimate" className="container-x grid scroll-mt-28 gap-10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-14 md:py-20">
        <div>
          <PaintedBoard>Free estimate</PaintedBoard>
          <p className="label mt-8 text-weathered">Rather talk?</p>
          <a href={lta.phoneHref} className="mt-2 block font-display text-[2.2rem] text-timber hover:underline">
            {lta.phone}
          </a>
        </div>
        <EstimateForm />
      </section>
    </>
  );
}
