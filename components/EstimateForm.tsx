"use client";

// The free-estimate request, drawn as the clerk's consignment sheet: ledger
// paper, a red margin rule, fields written on the ruled lines.
// DEMO: nothing is sent. On submit it checks the fields and shows the
// confirmation; hook it to their email (with the visitor as Reply-To) at launch.

import { useState, type FormEvent } from "react";

const PLACES = ["At Auction Acres", "At my place", "Not sure yet"] as const;

type Errors = Partial<Record<"name" | "contact" | "items", string>>;

export default function EstimateForm() {
  const [place, setPlace] = useState<(typeof PLACES)[number]>(PLACES[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const items = String(f.get("items") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Add your name.";
    if (!phone && !email) next.contact = "Add a phone number or an email so we can reach you.";
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) next.contact = "That email doesn't look right.";
    if (!items) next.items = "Tell us a little about what you're selling.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSentTo(name.split(/\s+/)[0]);
  }

  const clear = (key: keyof Errors) => () => setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er));

  if (sentTo) {
    return (
      <div className="relative border border-rule bg-ledger px-6 py-12 text-center md:px-10" role="status">
        <p className="font-hand text-[3rem] leading-none text-barn-red">Got it, {sentTo}!</p>
        <p className="mx-auto mt-4 max-w-sm text-lg">We’ll be in touch about your free estimate.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative border border-rule bg-ledger">
      <span aria-hidden="true" className="absolute inset-y-0 left-[1.6rem] border-l-[1.5px] border-barn-red/70 md:left-[2.2rem]" />
      <div className="space-y-0 py-2 pl-[2.6rem] pr-5 md:pl-[3.4rem] md:pr-8">
        <Line label="Your name" error={errors.name}>
          <input name="name" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} onChange={clear("name")} />
        </Line>
        <div className="grid gap-x-6 sm:grid-cols-2">
          <Line label="Phone" error={errors.contact}>
            <input name="phone" type="tel" autoComplete="tel" className={fieldClass} aria-invalid={!!errors.contact} onChange={clear("contact")} />
          </Line>
          <Line label="Email">
            <input name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={!!errors.contact} onChange={clear("contact")} />
          </Line>
        </div>
        <Line label="What are you selling?" error={errors.items}>
          <textarea name="items" rows={3} className={`${fieldClass} resize-y`} aria-invalid={!!errors.items} onChange={clear("items")} />
        </Line>
        <Line label="Town">
          <input name="town" autoComplete="address-level2" className={fieldClass} />
        </Line>
        <fieldset className="border-b border-rule py-4">
          <legend className="label float-left mb-3 w-full text-barn-red" style={{ fontSize: "0.7rem" }}>
            Where should we sell it?
          </legend>
          <div className="clear-both flex flex-wrap gap-2" role="radiogroup">
            {PLACES.map((p) => {
              const on = p === place;
              return (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setPlace(p)}
                  className={`label border px-3.5 py-2.5 transition-colors ${on ? "border-timber bg-timber text-lit-wall" : "border-rule bg-paper text-timber hover:border-timber"}`}
                  style={{ fontSize: "0.72rem" }}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="place" value={place} />
        </fieldset>
        <div className="py-6">
          <button type="submit" className="btn btn-red label">
            Ask for an estimate
          </button>
        </div>
      </div>
    </form>
  );
}

const fieldClass =
  "mt-1 block w-full border-0 border-b border-transparent bg-transparent px-0 py-1.5 text-rafter outline-none transition-colors focus:border-brass";

function Line({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block border-b border-rule pb-2 pt-4">
      <span className="label text-barn-red" style={{ fontSize: "0.7rem" }}>
        {label}
      </span>
      {children}
      {error ? <span className="mt-1 block text-sm text-barn-red">{error}</span> : null}
    </label>
  );
}
