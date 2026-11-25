// Line drawings for the auction house's features: drawn here (no icon
// library), in the stroke weight of the barn kit's rules. Stroke follows
// currentColor.

export type FacilityIconName = "floor" | "stage" | "sound" | "seating" | "access" | "parking";

const PATHS: Record<FacilityIconName, React.ReactNode> = {
  // A floor plan: the walls, an inside wall, a door swing.
  floor: (
    <>
      <rect x="7" y="9" width="34" height="30" />
      <path d="M24 9v12M24 27v12" />
      <path d="M7 31h7M14 31a7 7 0 0 1 7-7" />
      <path d="M7 5v2M41 5v2M7 6h34" />
    </>
  ),
  // The elevated stage: a platform with steps and the auctioneer's podium.
  stage: (
    <>
      <path d="M5 40h38M12 40V30h31v10" />
      <path d="M5 40v-3h4v-4h3" />
      <path d="M24 30v-11h9v11M22 19h13" />
    </>
  ),
  // A speaker cabinet.
  sound: (
    <>
      <rect x="13" y="6" width="22" height="36" rx="1.5" />
      <circle cx="24" cy="15" r="4" />
      <circle cx="24" cy="30" r="7" />
      <circle cx="24" cy="30" r="2" />
    </>
  ),
  // A folding chair, like the rows in their photos.
  seating: (
    <>
      <path d="M17 7l5 18M31 7v18" />
      <path d="M17 7h14M18.5 13h12.5" />
      <path d="M14 25h22" />
      <path d="M16 25l-4 16M34 25l4 16M20 25l12 16M30 25l-12 16" />
    </>
  ),
  // Handicap accessible: the access symbol.
  access: (
    <>
      <circle cx="22" cy="8" r="3" />
      <path d="M22 13v12h11l4 11" />
      <path d="M22 18h9" />
      <path d="M17 20.5a10 10 0 1 0 13 12.5" />
    </>
  ),
  // A parking sign on its post.
  parking: (
    <>
      <rect x="11" y="5" width="26" height="24" rx="1.5" />
      <path d="M24 29v14M18 43h12" />
      <path d="M20 23V11h6a4 4 0 0 1 0 8h-6" />
    </>
  ),
};

export default function FacilityIcon({ name, className = "" }: { name: FacilityIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
