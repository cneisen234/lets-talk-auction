import type { Metadata } from "next";
import Link from "next/link";
import { featuredSale } from "@/lib/sales";
import { SoldStamp } from "@/components/Barn";

// 404: a clerk's ledger sheet nailed to the barn wall, stamped SOLD.

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="barn-wall px-5 py-20 md:py-28">
      <div className="relative mx-auto max-w-md -rotate-[1deg] border border-rule bg-ledger px-8 pb-10 pt-12 text-center md:px-12">
        <span className="nail left-1/2 -top-[3px] -ml-[3px]" />
        <span aria-hidden="true" className="absolute inset-y-0 left-6 border-l-[1.5px] border-barn-red/70" />
        {/* The 404, stamped SOLD across it */}
        <div className="relative inline-block">
          <p aria-hidden="true" className="font-display text-[6.5rem] leading-none text-timber md:text-[7.5rem]">
            404
          </p>
          <SoldStamp size="lg" className="absolute -bottom-3 -right-10 md:-right-12" />
        </div>
        <h1 className="mt-6 text-[2.2rem] leading-tight md:text-[2.6rem]">Page not found.</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/sales/${featuredSale.slug}`} className="btn btn-red label">
            See the next sale
          </Link>
          <Link href="/" className="btn btn-timber label">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
