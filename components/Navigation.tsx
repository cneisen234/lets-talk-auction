"use client";

// Site header. Four links, every one a plain link (the Kindling navigation
// rule); the "See the lots" button isn't part of the menu. Same structure as
// every Kindling site: sticky, logo left, links with an active marker, the
// next sale and the main action on the right, and a full-screen phone menu
// that locks the page and closes on Escape.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { lta, navLinks } from "@/lib/lets-talk-auction";
import { featuredSale } from "@/lib/sales";
import { saleDateParts } from "@/lib/time";
import { StatusText } from "./SaleStatus";
import Logo from "./Logo";

const saleHref = `/sales/${featuredSale.slug}`;

/** The header's tiny bidder card: the next sale's date and its live status. */
function NextSaleChip() {
  const d = saleDateParts(featuredSale.date);
  return (
    <Link
      href={saleHref}
      className="group flex items-stretch overflow-hidden border border-rule bg-ledger leading-none"
      aria-label={`Next sale: ${d.weekday}, ${d.month} ${d.day}`}
    >
      <span className="label flex w-[3.1rem] flex-col items-center justify-center bg-barn-red py-1.5 text-lit-wall" style={{ fontSize: "0.68rem", letterSpacing: "0.12em" }}>
        {d.short}
        <span className="font-display mt-0.5 text-[1.35rem] tracking-normal normal-case">{d.day}</span>
      </span>
      <span className="label flex items-center px-3 text-barn-red group-hover:underline" style={{ fontSize: "0.7rem" }}>
        <StatusText sale={featuredSale} />
      </span>
    </Link>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="double-rule sticky top-0 z-50 bg-paper">
        <div className="container-x flex h-[78px] items-center justify-between gap-6 lg:h-[92px]">
          <Link href="/" onClick={close} aria-label={`${lta.name}, home`} className="shrink-0">
            <Logo place={false} className="text-[1.3rem] lg:text-[1.5rem]" />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {navLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`label relative flex flex-col items-center px-3 py-2 transition-colors hover:text-barn-red ${active ? "text-barn-red" : "text-timber"}`}
                      style={{ fontSize: "0.8rem" }}
                    >
                      {l.label}
                      <span aria-hidden="true" className={`absolute -bottom-1 text-[0.55rem] ${active ? "opacity-100" : "opacity-0"}`}>
                        ◆
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop: the next sale + the main action */}
          <div className="hidden items-center gap-4 lg:flex">
            <NextSaleChip />
            <Link href={saleHref} className="btn btn-red label">
              See the lots
            </Link>
          </div>

          {/* Phone: the next sale + menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <span className="hidden sm:block">
              <NextSaleChip />
            </span>
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="phone-menu"
              className={`flex h-11 w-11 items-center justify-center border border-rule ${isOpen ? "bg-timber" : "bg-ledger"}`}
            >
              <span className="relative block h-3.5 w-5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute left-0 block h-[2px] w-full transition-all duration-200"
                    style={{
                      top: i === 0 ? 0 : i === 1 ? "6px" : "12px",
                      background: isOpen ? "var(--lit-wall)" : "var(--timber)",
                      opacity: isOpen && i === 1 ? 0 : 1,
                      transform: isOpen ? (i === 0 ? "translateY(6px) rotate(45deg)" : i === 2 ? "translateY(-6px) rotate(-45deg)" : "none") : "none",
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen phone menu */}
      <div
        id="phone-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-lit-wall transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex min-h-full flex-col px-6 pb-8 pt-[110px]">
          <nav aria-label="Main" className="flex-1">
            <ul className="space-y-1">
              {navLinks.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href} className={isOpen ? "fade-in-up" : ""} style={{ animationDelay: `${i * 45}ms` }}>
                    <Link
                      href={l.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`font-display flex items-center gap-3 py-2 text-[2rem] ${active ? "text-barn-red" : "text-timber"}`}
                    >
                      {l.label}
                      {active ? <span aria-hidden="true" className="text-base">◆</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={saleHref} onClick={close} className="btn btn-red label">
                See the lots
              </Link>
              <NextSaleChip />
            </div>
          </nav>
          <div className="mt-10 space-y-1 border-t border-rule pt-5 text-base">
            <a href={lta.phoneHref} className="block font-semibold text-barn-red">
              {lta.phone}
            </a>
            <p className="text-weathered">
              {lta.venue} · {lta.street}, {lta.city}, {lta.state}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
