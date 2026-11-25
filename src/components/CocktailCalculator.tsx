"use client";

import Link from "next/link";
import { useState } from "react";

const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

export default function CocktailCalculator() {
  const [cocktails, setCocktails] = useState(100);
  const [extraHours, setExtraHours] = useState(0);

  const count = Math.max(100, cocktails);
  const base = 600;
  const extras = Math.max(0, count - 100) * 5;
  const machine = 50;
  const bartender = extraHours * 24.9;
  const total = base + extras + machine + bartender;

  const message = `Buchungsanfrage Mobile Cocktails: ${count} Cocktails, Bartender-Verlängerung ${extraHours} Std., geschätzter Richtwert ${euro(total)}.`;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">Preisbeispiel</p>
      <h3 className="display-font mb-6 text-2xl font-bold text-white">Cocktails für Ihre Feier kalkulieren</h3>

      <label className="mb-6 block">
        <span className="mb-2 flex justify-between text-sm font-semibold text-white/85">
          <span>Anzahl Cocktails (mind. 100)</span>
          <span className="text-gold">{count}</span>
        </span>
        <input
          type="range"
          min={100}
          max={500}
          step={10}
          value={count}
          onChange={(event) => setCocktails(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#FEDB00]"
        />
      </label>

      <label className="mb-7 block">
        <span className="mb-2 flex justify-between text-sm font-semibold text-white/85">
          <span>Bartender-Verlängerung (3 Std. inklusive)</span>
          <span className="text-gold">{extraHours} Std.</span>
        </span>
        <input
          type="range"
          min={0}
          max={8}
          step={1}
          value={extraHours}
          onChange={(event) => setExtraHours(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#FEDB00]"
        />
      </label>

      <div className="space-y-2 border-t border-white/15 pt-5 text-sm text-white/75">
        <div className="flex justify-between"><span>100 Cocktails (Mindestabnahme)</span><span>{euro(base)}</span></div>
        <div className="flex justify-between"><span>{count - 100} weitere Cocktails à 5,00 €</span><span>{euro(extras)}</span></div>
        <div className="flex justify-between"><span>Cocktailmaschine (Tagespreis)</span><span>{euro(machine)}</span></div>
        <div className="flex justify-between"><span>Bartender-Verlängerung</span><span>{euro(bartender)}</span></div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-white/20 pt-5">
        <span className="text-sm font-bold text-white/80">Geschätzter Gesamtpreis</span>
        <span className="display-font text-3xl font-bold text-gold">{euro(total)}</span>
      </div>
      <p className="mt-2 text-[11px] text-white/45">Unverbindlicher Richtwert, zzgl. Lieferkosten. Verbindlich nach unserer Terminbestätigung.</p>

      <Link
        href={`/buchungsanfragen?item=${encodeURIComponent("Mobile Cocktails")}&message=${encodeURIComponent(message)}`}
        className="mt-6 block rounded-full bg-gold px-6 py-3.5 text-center text-sm font-extrabold text-deep transition hover:bg-amber"
      >
        Cocktailbar-Buchungsanfrage stellen →
      </Link>
    </div>
  );
}
