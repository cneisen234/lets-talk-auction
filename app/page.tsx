import Link from "next/link";
import { lta } from "@/lib/lets-talk-auction";
import { featuredSale, lastSale } from "@/lib/sales";
import { saleDateParts } from "@/lib/time";
import BidderCard from "@/components/BidderCard";
import { ChantBand, Ledger, LotRow, NailedPrint, PaintedBoard, SoldStamp } from "@/components/Barn";
import Image from "next/image";

const saleHref = `/sales/${featuredSale.slug}`;
const TILTS = [-2, 1.5, -1, 2];

export default function Home() {
  const last = lastSale ? saleDateParts(lastSale.date) : null;

  return (
    <>
      {/* ---- Hero: their call, and the barn wall with the next sale nailed up ---- */}
      <section className="bg-timber text-lit-wall">
        <div className="container-x grid lg:grid-cols-2">
          <div className="flex flex-col justify-center pb-12 pt-12 lg:py-20 lg:pb-24 lg:pr-10">
            <h1 className="text-[3.1rem] leading-[0.98] sm:text-[4rem] lg:text-[4.6rem]">{lta.call.replace("Mio Style", "Mio Style")}</h1>
            <p className="mt-5 font-label text-lg font-semibold text-lit-wall/90 sm:text-xl">{featuredSale.title}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={saleHref} className="btn btn-cream label">
                See the lots
              </Link>
              <Link href="/visit" className="btn btn-outline-cream label">
                Directions
              </Link>
            </div>
          </div>

          <div className="barn-wall relative -mx-5 px-8 pb-20 pt-8 md:-mx-8 md:px-12 lg:mx-0 lg:border-l lg:border-black/25 lg:px-10 lg:pb-24 lg:pt-12">
            <NailedPrint
              src={featuredSale.cover}
              alt={featuredSale.coverAlt ?? ""}
              sizes="(min-width: 1024px) 34vw, 90vw"
              preload
            />
            <BidderCard sale={featuredSale} className="absolute bottom-8 left-3 -rotate-[5deg] sm:left-6 lg:bottom-10" width="clamp(6.75rem, 22vw, 8rem)" />
          </div>
        </div>
      </section>

      <ChantBand className="-my-7 md:-my-8" />

      {/* ---- On the tables: the lots, pinned to the lamplit pegboard ---- */}
      <section className="pegboard pb-14 pt-20 md:pb-20 md:pt-24">
        <div className="container-x text-center">
          <PaintedBoard>On the tables</PaintedBoard>
          <Ledger className="mx-auto mt-8 max-w-xl py-2">
            {featuredSale.lots.map((l, i) => (
              <LotRow key={l.lot} {...l} tilt={TILTS[i % TILTS.length]} />
            ))}
          </Ledger>
          <Link href={`${saleHref}#photos`} className="btn btn-timber label mt-8">
            All {featuredSale.photoCount} photos
          </Link>
        </div>
      </section>

      {/* ---- The last sale, stamped ---- */}
      {lastSale && last ? (
        <section className="container-x">
          <Link href="/sales" className="group flex flex-wrap items-center justify-between gap-4 border-b border-rule py-8">
            <span>
              <span className="label block text-weathered">
                {last.short} {last.day}
              </span>
              <span className="mt-1 block font-label text-xl font-semibold group-hover:underline">{lastSale.title}</span>
            </span>
            <SoldStamp />
          </Link>
        </section>
      ) : null}

      {/* ---- Selling, and finding the barn ---- */}
      <section className="container-x grid gap-12 py-16 md:grid-cols-2 md:gap-10 md:py-20">
        <Teaser
          photo="/photos/outdoor-crowd-rifle.webp"
          alt="The auctioneer holds up a rifle for a crowd of bidders at an outdoor sale"
          title="Selling? Let’s talk."
          href="/sell"
          cta="Sell with us"
        />
        <Teaser
          photo="/photos/barn-preview-wide.webp"
          alt="Inside the Auction Acres barn, tables of antiques and furniture set out for preview"
          title={lta.venue}
          note={lta.corner}
          href="/visit"
          cta="Directions"
        />
      </section>
    </>
  );
}

function Teaser({ photo, alt, title, note, href, cta }: { photo: string; alt: string; title: string; note?: string; href: string; cta: string }) {
  return (
    <div>
      <div className="border border-brass bg-paper p-[5px]">
        <div className="relative aspect-[16/10] w-full">
          <Image src={photo} alt={alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
        </div>
      </div>
      <h2 className="mt-6 text-[2rem] sm:text-[2.3rem]">{title}</h2>
      {note ? <p className="mt-2 text-weathered">{note}</p> : null}
      <Link href={href} className="btn btn-timber label mt-5">
        {cta}
      </Link>
    </div>
  );
}
