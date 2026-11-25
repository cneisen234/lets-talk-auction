"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Zoom from "./Zoom";
import type { GalleryPhoto } from "@/lib/sales";

// The sale's photo gallery: the carousel ported from Refind Boutique's outfit
// gallery (swipe, arrow keys, dots, tap for the lightbox; slides lazy-load as
// they come into view), re-dressed in the barn's kit, and paired with the
// auction's own idea: the photos are grouped by the sections of the sale
// listing ("To Include", "Sportsman", …), so the sections are how you jump
// through the sale, the way GoToAuction's gallery lays out a sale's photos.

function ArrowButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === 1 ? "Next photo" : "Previous photo"}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-timber text-lit-wall transition-colors hover:bg-timber-deep ${dir === 1 ? "-right-3 sm:-right-5" : "-left-3 sm:-left-5"}`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="square" strokeWidth={2} d={dir === 1 ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
      </svg>
    </button>
  );
}

export default function SaleGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = photos.length;
  const go = useCallback((dir: number) => setActive((a) => (a + dir + count) % count), [count]);

  const sections = [...new Set(photos.map((p) => p.section))];
  const current = photos[active];

  return (
    <div className="mx-auto max-w-[44rem]">
      {/* The listing's sections: pick one to jump to its photos */}
      <ul className="flex flex-wrap justify-center gap-2">
        {sections.map((name) => {
          const on = current.section === name;
          return (
            <li key={name}>
              <button
                type="button"
                onClick={() => setActive(photos.findIndex((p) => p.section === name))}
                aria-pressed={on}
                className={`label border px-4 py-2.5 transition-colors ${on ? "border-timber bg-timber text-lit-wall" : "border-rule bg-ledger text-timber hover:border-timber"}`}
                style={{ fontSize: "0.75rem" }}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>

      <div
        className="relative mt-9"
        role="group"
        aria-roledescription="carousel"
        aria-label="Photos from the sale"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <div className="relative">
          {/* The matted print, hung by one nail */}
          <div className="relative bg-paper p-2.5 sm:p-3" style={{ border: "1px solid var(--rule)" }}>
            <span className="nail left-1/2 -top-[3px] -ml-[3px]" />
            <div className="overflow-hidden border border-brass">
              <div
                onTouchStart={(e) => {
                  touchX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (touchX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchX.current;
                  if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
                  touchX.current = null;
                }}
              >
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
                  {photos.map((p, i) => (
                    <div
                      key={p.photo}
                      className="min-w-full"
                      aria-hidden={i !== active}
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${count}: Lot ${p.lot}, ${p.name}`}
                    >
                      <Zoom src={p.photo} alt={p.alt} focusable={i === active} className="block">
                        {/* Photos that don't fill the frame hang against the barn wall */}
                        <div className="barn-wall relative aspect-[4/3] w-full">
                          <Image src={p.photo} alt={p.alt} fill className="object-contain" sizes="(max-width: 768px) 92vw, 680px" />
                        </div>
                      </Zoom>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ArrowButton dir={-1} onClick={() => go(-1)} />
          <ArrowButton dir={1} onClick={() => go(1)} />
        </div>

        {/* The lot on the print */}
        <p className="mt-5 text-center" aria-live="polite">
          <span className="label text-barn-red">Lot {current.lot}</span>
          <span className="mt-1 block font-label text-lg font-semibold">{current.name}</span>
        </p>

        {/* Dots + counter */}
        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex flex-wrap justify-center gap-2">
            {photos.map((p, i) => (
              <button
                key={p.photo}
                type="button"
                aria-label={`Show lot ${p.lot}, ${p.name}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className="h-2.5 transition-all"
                style={{ width: i === active ? 22 : 10, background: i === active ? "var(--barn-red)" : "var(--rule)" }}
              />
            ))}
          </div>
          <p className="label text-weathered">
            {active + 1} <span className="text-barn-red">/</span> {count}
          </p>
        </div>
      </div>
    </div>
  );
}
