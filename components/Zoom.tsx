"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** classes applied to the clickable thumbnail wrapper */
  className?: string;
  /** false takes the thumbnail out of the tab order (e.g. an off-screen slide) */
  focusable?: boolean;
  children: React.ReactNode;
};

/*
 * Click-to-zoom lightbox, ported from Refind Boutique (which ported it from
 * Megan's Sourdough) at Chris's request, re-dressed for the barn: a timber
 * backdrop and the photo matted like a print. The thumbnail (children) stays
 * exactly as the page laid it out; clicking it opens a full-viewport overlay
 * rendered into <body> via a portal, so it escapes any parent overflow or
 * stacking context.
 *
 * Closing has to be bullet-proof on mobile, so:
 *  - The entire backdrop dismisses on tap. Only a tap on the image itself is
 *    ignored, and because the image is sized to its own box, the letterbox
 *    around it counts as backdrop and dismisses too.
 *  - The backdrop carries `cursor-zoom-out`; iOS Safari only dispatches `click`
 *    on non-button elements that have a pointer cursor.
 *  - The overlay is sized with dynamic viewport height + safe-area insets so the
 *    close button is never hidden behind the browser's toolbars.
 *  - No backdrop-filter: on Android Chrome a blurred, portaled fixed layer can
 *    stop taking taps after a refresh or route change.
 */
export default function Zoom({ src, alt, className = "", focusable = true, children }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    // Preserve whatever scroll lock was set (e.g. the phone menu) and restore it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={focusable ? 0 : -1}
        aria-label={`View larger: ${alt}`}
        className={`cursor-zoom-in ${className}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {children}
      </div>

      {open &&
        createPortal(
          <div
            className="lightbox-in fixed left-0 right-0 top-0 z-[100] flex h-screen cursor-zoom-out items-center justify-center"
            style={{
              height: "100dvh",
              padding: "max(1rem, env(safe-area-inset-top)) 1rem max(1rem, env(safe-area-inset-bottom))",
              backgroundColor: "rgba(35, 25, 18, 0.95)",
            }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 z-[101] flex h-11 w-11 items-center justify-center border border-brass-lit/60 text-lit-wall"
              style={{ top: "max(1rem, env(safe-area-inset-top))", backgroundColor: "rgba(239, 227, 198, 0.12)" }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <Image
              src={src}
              alt={alt}
              width={1200}
              height={1600}
              onClick={(e) => e.stopPropagation()}
              className="h-auto max-h-[85vh] w-auto max-w-full cursor-default border-[6px] border-lit-wall object-contain outline outline-1 -outline-offset-[10px] outline-brass"
              style={{ maxWidth: "min(100%, 1024px)", maxHeight: "85dvh" }}
              sizes="(max-width: 1024px) 100vw, 1024px"
              preload
            />
          </div>,
          document.body,
        )}
    </>
  );
}
