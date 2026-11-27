// Lets Talk Auction: every business fact the site shows, in one place.
// Each fact names its source. Values marked DEMO are mocked for the demo site
// and must be confirmed (or swapped for the real thing) before launch.
//
// Sources:
//   [site]    letstalkauction.com (home, About Us, Our Location, Why Auction)
//   [listing] their Dec 5, 2026 sale listing on EstateSale.com (#911415)
//   [profile] their EstateSale.com company profile (#6482)

export const lta = {
  name: "Lets Talk Auction", // [site] written without an apostrophe
  // [profile] their slogan
  slogan: "Buying? Selling? …then Lets Talk Auction!",
  // [site] Why Auction: "~ Your Full Service Auction Company ~"
  tagline: "Your full‑service auction company", // non-breaking hyphen keeps "full-service" together
  // [site] About Us: "watch them as they Auction … Mio Style!"
  call: "Auction… Mio Style!",

  venue: "Auction Acres", // [listing] "Location: Auction Acres"
  street: "1491 N. Perry Creek Rd.", // [site] Our Location
  city: "Mio",
  state: "MI",
  zip: "48647",
  corner: "Corner of M-33 and Perry Creek Rd.", // [site] Our Location
  // [listing] directions, in their words
  directions: [
    "7 miles north of the traffic light in Mio (M-33/M-72)",
    "2 miles west of the blinking light in Fairview (M-33/M-72)",
  ],
  // Business name first so the map pin shows their name ("LETS TALK AUCTION
  // COMPANY" on Google), never just the street number.
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Lets+Talk+Auction+Company,+1491+N+Perry+Creek+Rd,+Mio,+MI+48647",
  mapsEmbed: "https://www.google.com/maps?q=Lets+Talk+Auction+Company,+1491+N+Perry+Creek+Rd,+Mio,+MI+48647&output=embed",

  // DEMO: real contact details stay off the demo site until launch.
  phone: "(989) 555-0148", // DEMO
  phoneHref: "tel:+19895550148", // DEMO
  email: "hello@letstalkauction.com", // DEMO

  // [listing] sale-day times
  saleDay: {
    doors: "8:30 AM", // "Preview 8:30AM Day of Sale"
    bidding: "10:00 AM",
  },

  // [listing] Terms, in plain words
  terms: [
    "Cash, Michigan check with valid ID, Visa, Mastercard or Discover",
    "Register with a valid driver's license",
    "5% buyer's premium when paying by card",
    "Everything sells as is, where is",
    "Announcements on sale day take precedence over printed material",
  ],

  // The auction house, in their words. [site] About Us: "3,200 square foot
  // barn … professional sound system, elevated stage for better viewing, is
  // handicap accessible and is adjacent to nearly four acres of off-road
  // parking". [profile] "comfortable seating".
  facility: [
    { icon: "floor", label: "3,200 square feet" },
    { icon: "stage", label: "Elevated stage" },
    { icon: "sound", label: "Professional sound system" },
    { icon: "seating", label: "Comfortable seating" },
    { icon: "access", label: "Handicap accessible" },
    { icon: "parking", label: "Nearly four acres of off-road parking" },
  ],

  // [site] home page: "Specializing In"
  specialties: [
    "Estates",
    "Antiques",
    "Farm",
    "Commercial",
    "Real estate",
    "Liquidations",
    "Delinquent storage",
    "Household",
    "Charities",
  ],

  // Selling with them, in three beats. Every line is their own claim:
  // [site] Why Auction: "call for a Free Auction Estimate", "Equipped to
  // auction at our place or yours", "One-day Event", "Professional
  // bookkeeping and itemized receipts"; [profile] "From set-up to Sale,
  // we'll do it all". DEMO: the order of the steps is our best guess at how
  // a consignment runs; confirm with them.
  sellSteps: [
    { call: "Going once", line: "Call for a free auction estimate." },
    { call: "Going twice", line: "From set-up to sale, we’ll do it all." },
    { call: "Sold!", line: "Professional bookkeeping and itemized receipts." },
  ],

  experience: "over 35 years", // [site] home page: "in the auction profession for over 35 years"
  generation: "Second-generation auction company", // [site] About Us
  serviceArea: "All of Michigan and Northwest Ohio", // [profile] "Serving All of Michigan and North West Ohio"
  invite: "Come and spend an enjoyable day with us in Mio.", // [profile]
  memberships: ["National Auctioneers Association", "Michigan State Auctioneers Association"], // [site] home page
} as const;

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/sales", label: "Sales" },
  { href: "/sell", label: "Sell with us" },
  { href: "/visit", label: "Visit" },
  { href: "/about", label: "About" },
];
