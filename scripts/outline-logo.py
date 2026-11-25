# Usage (from the project root, after `npm run build` so next/font's files exist):
#   python3 -m venv /tmp/fontenv && /tmp/fontenv/bin/pip install fonttools brotli uharfbuzz
#   mkdir -p /tmp/lta-fonts/fonts   # then convert the three .woff2 files in
#   .next/static/media (Young Serif, Covered By Your Grace, Schibsted Grotesk at
#   wght 600) to /tmp/lta-fonts/fonts/{young,grace,schibsted}.ttf with fontTools,
#   then:  /tmp/fontenv/bin/python scripts/outline-logo.py /tmp/lta-fonts /tmp/lta-fonts
# It writes logo.json + icon.json; their path strings go into components/logo-paths.ts
# and the SVGs in public/brand/ and app/icon.svg.
"""Outline the Lets Talk Auction logo (approved refinement A1) into SVG paths.

Reproduces components/Logo.tsx's layout in em units (AUCTION = 100 units):
  line 1: "Lets" Young Serif 0.78em + gap 0.26em + "Talk" Covered By Your Grace
          1.4em (line-height 0.9, rotated -7deg about its box center),
          baselines aligned, line-height 1 elsewhere
  line 2: margin-top 0.1em; 0.11em double rules top/bottom; padding .19em top,
          .15em bottom, .16em left; "AUCTION" Young Serif 1em, letter-spacing .16em
  line 3: margin-top 0.6em; "MIO · MICHIGAN" Schibsted Grotesk 600, 0.34em,
          letter-spacing 0.2em
Text is shaped with HarfBuzz (kerning like the browser).
"""
import json, math, sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

S, OUT = sys.argv[1], sys.argv[2]
FONTS = {k: f"{S}/fonts/{k}.ttf" for k in ("young", "grace", "schibsted")}


class Face:
    def __init__(self, path):
        self.tt = TTFont(path)
        self.upm = self.tt["head"].unitsPerEm
        self.asc = self.tt["hhea"].ascent / self.upm
        self.desc = -self.tt["hhea"].descent / self.upm
        self.gs = self.tt.getGlyphSet()
        self.order = self.tt.getGlyphOrder()
        blob = hb.Blob.from_file_path(path)
        self.hbfont = hb.Font(hb.Face(blob))

    def shape(self, text, size, spacing=0.0):
        """[(glyphname, x)] in px at `size`, plus total advance (incl. trailing spacing like CSS)."""
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, {"kern": True, "liga": True})
        x, out = 0.0, []
        s = size / self.upm
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            out.append((self.order[info.codepoint], x + pos.x_offset * s))
            x += pos.x_advance * s + spacing
        return out, x

    def path(self, glyphs, size, ox, baseline, rot=None):
        """SVG path for shaped glyphs with origin (ox, baseline); optional rotation (deg, cx, cy)."""
        s = size / self.upm
        pen = SVGPathPen(self.gs, ntos=lambda v: f"{v:.1f}".rstrip("0").rstrip("."))
        for name, x in glyphs:
            # font units (y up) -> page px (y down)
            a, b, c, d, e, f = s, 0, 0, -s, ox + x, baseline
            if rot:
                deg, cx, cy = rot
                r = math.radians(deg)
                cos, sin = math.cos(r), math.sin(r)
                # R(about cx,cy) * M
                a2, b2 = cos * a - sin * b, sin * a + cos * b
                c2, d2 = cos * c - sin * d, sin * c + cos * d
                e2 = cos * (e - cx) - sin * (f - cy) + cx
                f2 = sin * (e - cx) + cos * (f - cy) + cy
                a, b, c, d, e, f = a2, b2, c2, d2, e2, f2
            self.gs[name].draw(TransformPen(pen, (a, b, c, d, e, f)))
        return pen.getCommands()

    def box(self, size, lh):
        """CSS inline box with line-height lh: (top-to-baseline, height)."""
        half = (lh * size - (self.asc + self.desc) * size) / 2
        return half + self.asc * size, lh * size


young, grace, sch = Face(FONTS["young"]), Face(FONTS["grace"]), Face(FONTS["schibsted"])
EM = 100.0

# ---- line 1 ---------------------------------------------------------------
lets_g, lets_w = young.shape("Lets", 0.78 * EM)
talk_g, talk_w = grace.shape("Talk", 1.4 * EM)
lets_b, lets_h = young.box(0.78 * EM, 1.0)
talk_b, talk_h = grace.box(1.4 * EM, 0.9)
gap = 0.26 * EM
above = max(lets_b, talk_b)
below = max(lets_h - lets_b, talk_h - talk_b)
line1_h = above + below
line1_w = lets_w + gap + talk_w

# ---- line 2 ---------------------------------------------------------------
auc_g, auc_w = young.shape("AUCTION", EM, spacing=0.16 * EM)
t = 0.11 * EM
pad_t, pad_b, pad_l = 0.19 * EM, 0.15 * EM, 0.16 * EM
auc_b, auc_h = young.box(EM, 1.0)
block_w = pad_l + auc_w
block_h = t + pad_t + auc_h + pad_b + t
line2_top = line1_h + 0.1 * EM

# ---- line 3 ---------------------------------------------------------------
place_size = 0.34 * EM
place_g, place_w = sch.shape("MIO · MICHIGAN", place_size, spacing=0.2 * place_size)
place_b, place_h = sch.box(place_size, 1.0)
line3_top = line2_top + block_h + 0.6 * EM

W = max(line1_w, block_w, place_w)
H_place = line3_top + place_h
H_short = line2_top + block_h

# positions (everything centered)
l1x = (W - line1_w) / 2
baseline1 = above
lets_x = l1x
talk_x = l1x + lets_w + gap
talk_top = baseline1 - talk_b
talk_rot = (-7, talk_x + talk_w / 2, talk_top + talk_h / 2)

bx = (W - block_w) / 2
auc_baseline = line2_top + t + pad_t + auc_b
rules = []
third = t / 3
for y0 in (line2_top, line2_top + block_h - t):
    rules.append((bx, y0, block_w, third))
    rules.append((bx, y0 + 2 * third, block_w, third))

px = (W - place_w) / 2
place_baseline = line3_top + place_b

ink = young.path(lets_g, 0.78 * EM, lets_x, baseline1) + young.path(auc_g, EM, bx + pad_l, auc_baseline)
call = grace.path(talk_g, 1.4 * EM, talk_x, baseline1, rot=talk_rot)
place = sch.path(place_g, place_size, px, place_baseline)
rules_d = "".join(f"M{x:.1f} {y:.2f}h{w:.1f}v{h:.2f}h-{w:.1f}z" for x, y, w, h in rules)

# The rotated "Talk" pokes above the box; pad the viewBox so nothing clips.
pad = 0.12 * EM
vb_x, vb_y = -2.0, -pad
VB = dict(x=vb_x, y=vb_y, w=W + 4.0, hPlace=H_place + pad + 2, hShort=H_short + pad + 2)

data = {"viewBox": VB, "ink": ink + rules_d, "call": call, "place": place}
json.dump(data, open(f"{OUT}/logo.json", "w"))

# ---- the icon mark: "Talk" on barn red ----------------------------------------
size = 30.0
ig, iw = grace.shape("Talk", size)
ib, ih = grace.box(size, 0.9)
ix = (64 - iw) / 2
itop = (64 - ih) / 2 + 1.5
icall = grace.path(ig, size, ix, itop + ib, rot=(-7, 32, 32))
json.dump({"call": icall}, open(f"{OUT}/icon.json", "w"))
print("W", round(W, 1), "H", round(H_place, 1), "short", round(H_short, 1))
