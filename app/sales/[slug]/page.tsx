import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { lta } from "@/lib/lets-talk-auction";
import { allSales, featuredSale, saleBySlug, type Sale } from "@/lib/sales";
import { saleDateParts } from "@/lib/time";
import BidderCard from "@/components/BidderCard";
import SaleGallery from "@/components/SaleGallery";
import { BulletLedger, ChantBand, NailedPrint, PaintedBoard, SoldStamp } from "@/components/Barn";

// One sale: the listing their GoToAuction feed links to (the photos, what's
// selling, the terms), in the barn's kit. An upcoming sale gets its bidder
// card nailed up; a past one gets its photo, stamped SOLD.

export function generateStaticParams() {
  return allSales().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sales/[slug]">): Promise<Metadata> {
  const sale = saleBySlug((await params).slug);
  if (!sale) return {};
  const d = saleDateParts(sale.date);
  return {
    title: `${sale.title}, ${d.short} ${d.day}`,
    description: `${sale.title} auction at Auction Acres in Mio, Michigan, ${d.weekday}, ${d.month} ${d.day}.`,
  };
}

// The slug is URL data, so it's read inside Suspense: navigation shows the
// timber band at once and the sale streams in (Next 16's instant navigation).
// Every sale is also prerendered by generateStaticParams for direct visits.
export default function SalePage({ params }: PageProps<"/sales/[slug]">) {
  return (
    <Suspense fallback={<section className="h-[22rem] bg-timber" aria-busy="true" />}>
      {params.then(({ slug }) => (
        <SaleContent slug={slug} />
      ))}
    </Suspense>
  );
}

function SaleContent({ slug }: { slug: string }) {
  const sale = saleBySlug(slug);
  if (!sale) notFound();
  const sold = sale.date < featuredSale.date;
  return sold ? <SoldSale sale={sale} /> : <UpcomingSale sale={sale} />;
}

/* ---- An upcoming sale ---------------------------------------------------- */

function UpcomingSale({ sale }: { sale: Sale }) {
  return (
    <>
      <section className="bg-timber text-lit-wall">
        <div className="container-x grid md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div className="flex flex-col justify-center pb-12 pt-10 md:py-16 md:pr-10 lg:py-20">
            <Link href="/sales" className="label text-brass-lit hover:underline">
              ← All sales
            </Link>
            <h1 className="mt-4 text-[2.8rem] leading-[1.02] sm:text-[3.4rem] lg:text-[4.2rem]">{sale.title}</h1>
            <p className="label mt-4 text-lit-wall/85">{sale.location}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#photos" className="btn btn-cream label">
                {sale.photoCount} photos
              </a>
              <a href="#terms" className="btn btn-outline-cream label">
                Terms
              </a>
            </div>
          </div>
          <div className="barn-wall -mx-5 flex items-center justify-center px-8 pb-14 pt-12 md:mx-0 md:border-l md:border-black/25 md:pb-16">
            <div className="relative -rotate-[3deg]">
              <span className="nail left-1/2 -top-[3px] z-10 -ml-[3px]" />
              <BidderCard sale={sale} width="clamp(9.5rem, 42vw, 11.5rem)" />
            </div>
          </div>
        </div>
      </section>

      {sale.gallery?.length ? (
        <section id="photos" className="container-x scroll-mt-28 py-14 text-center md:py-20">
          <PaintedBoard>The photos</PaintedBoard>
          <div className="mt-8">
            <SaleGallery photos={sale.gallery} />
          </div>
        </section>
      ) : null}

      <ChantBand className="-my-7 md:-my-8" />

      {sale.sections?.length ? (
        <section className="pegboard pb-16 pt-20 md:pb-20 md:pt-24">
          <div className="container-x text-center">
            <PaintedBoard>What’s selling</PaintedBoard>
            <div className="mt-8 grid items-start gap-6 lg:grid-cols-3">
              {sale.sections.map((s) => (
                <BulletLedger key={s.name} title={s.name} items={s.items} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TermsAndDirections />
    </>
  );
}

function TermsAndDirections() {
  return (
    <section id="terms" className="container-x grid scroll-mt-28 gap-12 py-16 md:grid-cols-2 md:gap-10 md:py-20">
      <div>
        <PaintedBoard>Terms</PaintedBoard>
        <BulletLedger items={lta.terms} className="mt-7" />
      </div>
      <div>
        <PaintedBoard>Getting here</PaintedBoard>
        <h2 className="mt-7 text-[2rem]">{lta.venue}</h2>
        <p className="mt-2 text-weathered">
          {lta.street}, {lta.city}, {lta.state} {lta.zip}
        </p>
        <ul className="mt-5 space-y-2">
          {lta.directions.map((d) => (
            <li key={d} className="flex gap-3">
              <span aria-hidden="true" className="pt-1 text-[0.55rem] text-barn-red">
                ◆
              </span>
              {d}
            </li>
          ))}
        </ul>
        <a href={lta.mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-timber label mt-7">
          Open in Maps
        </a>
      </div>
    </section>
  );
}

/* ---- A past sale ---------------------------------------------------------- */

function SoldSale({ sale }: { sale: Sale }) {
  const d = saleDateParts(sale.date);
  const next = featuredSale;
  return (
    <>
      <section className="bg-timber text-lit-wall">
        <div className="container-x grid md:grid-cols-2">
          <div className="flex flex-col justify-center pb-12 pt-10 md:py-16 md:pr-10 lg:py-20">
            <Link href="/sales" className="label text-brass-lit hover:underline">
              ← All sales
            </Link>
            <h1 className="mt-4 text-[2.6rem] leading-[1.02] sm:text-[3.2rem] lg:text-[3.8rem]">{sale.title}</h1>
            <p className="label mt-4 text-lit-wall/85">
              {d.weekday}, {d.month} {d.day} · {sale.location}
            </p>
          </div>
          <div className="barn-wall relative -mx-5 px-8 pb-14 pt-10 md:mx-0 md:border-l md:border-black/25 md:px-10">
            <NailedPrint src={sale.cover} alt={sale.coverAlt ?? ""} sizes="(min-width: 768px) 42vw, 90vw" tilt={-0.8} />
            <SoldStamp size="lg" className="absolute bottom-8 right-6 md:right-8" />
          </div>
        </div>
      </section>

      <section className="container-x grid items-center gap-8 py-16 md:grid-cols-[auto_1fr] md:gap-12 md:py-20">
        <BidderCard sale={next} className="-rotate-[3deg] justify-self-center md:justify-self-start" width="9rem" />
        <div>
          <p className="label text-weathered">Next sale</p>
          <h2 className="mt-2 text-[2.2rem] md:text-[2.6rem]">{next.title}</h2>
          <Link href={`/sales/${next.slug}`} className="btn btn-red label mt-6">
            See the lots
          </Link>
        </div>
      </section>
    </>
  );
}
