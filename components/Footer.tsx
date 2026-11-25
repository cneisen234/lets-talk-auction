import Link from "next/link";
import { lta, navLinks } from "@/lib/lets-talk-auction";
import Logo from "./Logo";
import Year from "./Year";

// The footer: the double rule, then the timber wall. Same links as the header
// (the Kindling navigation rule), where to find the barn, and their slogan.

export default function Footer() {
  return (
    <footer className="bg-timber text-lit-wall" style={{ borderTop: "4px double var(--rafter)" }}>
      <div className="container-x grid gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Logo tone="dark" className="text-[1.6rem]" />
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="label text-brass-lit">Explore</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label text-brass-lit">{lta.venue}</p>
          <address className="mt-4 not-italic leading-relaxed">
            {lta.street}
            <br />
            {lta.city}, {lta.state} {lta.zip}
          </address>
          <a href={lta.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-brass-lit hover:underline">
            Directions
          </a>
        </div>

        <div className="md:col-span-3">
          <p className="label text-brass-lit">Call Auction Acres</p>
          <a href={lta.phoneHref} className="mt-4 block font-display text-2xl hover:underline">
            {lta.phone}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-sm text-lit-wall/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year /> {lta.name}
          </p>
          <p className="label text-brass-lit" style={{ letterSpacing: "0.14em" }}>
            {lta.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
