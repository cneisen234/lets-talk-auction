// The sale listings. On their current WordPress site these come from a
// GoToAuction feed (company es_id 1809). For the demo they come from
// data/sales.json, in the same shape; when the real feed is hooked up, only
// this file changes.

import data from "@/data/sales.json";

export type Lot = { lot: number; name: string; photo: string; alt: string };
export type GalleryPhoto = Lot & { section: string };
/** A section of the sale listing, as they write it ("To Include", "Sportsman", …). */
export type ListingSection = { name: string; items: string[] };

export type Sale = {
  slug: string;
  title: string;
  date: string; // "YYYY-MM-DD", in Mio
  doors: string; // "HH:MM"
  start: string; // "HH:MM"
  location: string;
  photoCount: number;
  cover: string;
  coverAlt?: string;
  lots: Lot[];
  gallery?: GalleryPhoto[];
  sections?: ListingSection[];
};

export function saleBySlug(slug: string) {
  return sales.find((s) => s.slug === slug) ?? null;
}

const sales = (data.sales as Sale[]).slice().sort((a, b) => a.date.localeCompare(b.date));

export function allSales() {
  return sales;
}

/** The first sale on or after `today` ("YYYY-MM-DD" in Mio). */
export function nextSale(today: string) {
  return sales.find((s) => s.date >= today) ?? null;
}

/** Sales before `today`, most recent first. */
export function pastSales(today: string) {
  return sales.filter((s) => s.date < today).reverse();
}

/** The sale the demo features. The site is static, so "next" is fixed to the
 *  demo's upcoming sale rather than computed from the clock at build time;
 *  the bidder card's countdown is live in the browser. */
export const featuredSale = sales.find((s) => s.lots.length > 0) ?? sales[sales.length - 1];
export const lastSale = pastSales(featuredSale.date)[0] ?? null;

/** For the Sales page, measured from the featured sale (see above). */
export const upcomingSales = sales.filter((s) => s.date >= featuredSale.date);
export const soldSales = pastSales(featuredSale.date);
