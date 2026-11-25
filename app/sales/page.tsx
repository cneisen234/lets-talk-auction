import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lta } from "@/lib/lets-talk-auction";
import { soldSales, upcomingSales, type Sale } from "@/lib/sales";
import { saleDateParts } from "@/lib/time";
import BidderCard from "@/components/BidderCard";
import { ChantBand, Ledger, NailedPrint, PaintedBoard, SoldStamp } from "@/components/Barn";

export const metadata: Metadata = {
  title: "Sales",
  description: "Upcoming and past auctions at Auction Acres in Mio, Michigan.",
};

// The sale listings, the way their GoToAuction feed shows them (title, date,
// countdown, photo count, a photo), in the barn's kit: what's coming up is
// nailed to the barn wall with its bidder card; what's sold goes in the
// clerk's ledger, stamped.

const CLOSING: ({ call: string } | { bid: string })[] = [
  { call: "going once" },
  { bid: "going twice" },
  { call: "last call" },
  { bid: "sold!" },
  { call: "thank you, bidder" },
  { bid: "next lot" },
  { call: "who’ll start me" },
  { bid: "going once" },
];

export default function SalesPage() {
  return (
    <>
      <section className="bg-timber text-lit-wall">
        <div className="container-x py-12 md:py-16">
          <p className="label text-brass-lit">
            {lta.venue} · {lta.city}, Michigan
          </p>
          <h1 className="mt-3 text-[3.4rem] md:text-[4.6rem]">Sales</h1>
        </div>
      </section>

      {/* ---- Coming up: nailed to the barn wall ---- */}
      <section className="container-x py-14 md:py-20">
        <PaintedBoard>Coming up</PaintedBoard>
        <div className="mt-8 space-y-12">
          {upcomingSales.map((s) => (
            <UpcomingSale key={s.slug} sale={s} />
          ))}
        </div>
      </section>

      <ChantBand chant={CLOSING} className="-my-7 md:-my-8" />

      {/* ---- Sold: the clerk's ledger ---- */}
      <section className="pegboard pb-16 pt-20 md:pb-24 md:pt-24">
        <div className="container-x text-center">
          <PaintedBoard>Past sales</PaintedBoard>
          <Ledger className="mx-auto mt-8 max-w-2xl py-1">
            {soldSales.map((s, i) => (
              <PastSaleRow key={s.slug} sale={s} tilt={i % 2 ? 1.5 : -1.5} />
            ))}
          </Ledger>
        </div>
      </section>
    </>
  );
}

function UpcomingSale({ sale }: { sale: Sale }) {
  const href = `/sales/${sale.slug}`;
  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div className="barn-wall relative px-7 pb-16 pt-8 md:px-10 md:pb-20 md:pt-10">
        <NailedPrint src={sale.cover} alt={sale.coverAlt ?? ""} sizes="(min-width: 768px) 42vw, 90vw" tilt={-0.6} />
        <BidderCard sale={sale} className="absolute bottom-6 left-2 -rotate-[5deg] sm:left-4" width="clamp(6.75rem, 22vw, 8rem)" />
      </div>
      <div>
        <h2 className="text-[2.2rem] md:text-[2.8rem]">
          <Link href={href} className="hover:underline">
            {sale.title}
          </Link>
        </h2>
        <p className="label mt-3 text-weathered">{sale.location}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={href} className="btn btn-red label">
            See the lots
          </Link>
          <Link href={`${href}#photos`} className="btn btn-timber label">
            {sale.photoCount} photos
          </Link>
        </div>
      </div>
    </article>
  );
}

function PastSaleRow({ sale, tilt }: { sale: Sale; tilt: number }) {
  const d = saleDateParts(sale.date);
  return (
    <Link href={`/sales/${sale.slug}`} className="group flex items-center gap-4 border-b border-rule py-3 pr-4 last:border-b-0 md:gap-5">
      <span className="flex w-[3.6rem] flex-none flex-col items-center text-barn-red md:w-[4.25rem]">
        <span className="label" style={{ fontSize: "0.68rem" }}>
          {d.short}
        </span>
        <span className="font-display text-2xl leading-none">{d.day}</span>
      </span>
      <span className="relative h-[68px] w-[68px] flex-none border border-rule bg-ledger p-1 md:h-[84px] md:w-[84px]" style={{ transform: `rotate(${tilt}deg)` }}>
        <span className="relative block h-full w-full">
          <Image src={sale.cover} alt="" fill sizes="84px" className="object-cover" />
        </span>
        <SoldStamp size="sm" className="absolute -bottom-2 -right-1.5 md:-right-3" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-label text-[1.05rem] font-semibold leading-snug text-rafter group-hover:underline md:text-lg">{sale.title}</span>
        <span className="mt-0.5 block text-sm text-weathered">{sale.photoCount} photos</span>
      </span>
    </Link>
  );
}
