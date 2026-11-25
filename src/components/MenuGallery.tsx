"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  categoryIcon,
  categoryOrder,
  formatPrice,
  MAIN_CATEGORIES,
  OCCASIONS,
  type MenuItem,
} from "@/data/menu";

const ALL = "Alle";

function ProductCard({ item }: { item: MenuItem }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.description.length > 150;
  const isTopChoice = item.badge === "Meistgewählt";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white card-shadow transition hover:-translate-y-0.5 hover:shadow-xl ${
        isTopChoice ? "border-2 border-gold ring-2 ring-gold/40" : "border border-forest/10"
      }`}
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-forest to-leaf">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl" aria-hidden="true">
            {categoryIcon(item.category)}
          </div>
        )}
        {item.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide shadow-sm ${
              isTopChoice ? "bg-gold text-deep ring-2 ring-deep/20" : "bg-gold text-deep"
            }`}
          >
            {isTopChoice ? `★ ${item.badge}` : item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="display-font text-xl font-bold leading-snug text-forest">{item.name}</h3>
        {item.description && (
          <p className={`mt-2 text-sm leading-relaxed text-ink/65 ${isLong && !expanded ? "line-clamp-3" : ""}`}>
            {item.description}
          </p>
        )}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-1 self-start text-xs font-bold text-leaf underline underline-offset-4"
          >
            {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
          </button>
        )}

        {item.category === "Beispielmenüs" && (
          <p className="mt-3 rounded-lg bg-cream px-2.5 py-1.5 text-[11px] font-semibold leading-snug text-forest/85">
            Hinweis: Ohne Geschirr · Geschirr & Besteck (+ 2,50 € p. P.) dazubuchbar
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-forest/10 pt-4">
          <div>
            <span className="block text-lg font-extrabold text-forest">{formatPrice(item.priceCents)}</span>
            {item.priceUnit && <span className="text-[11px] font-medium text-ink/50">{item.priceUnit}</span>}
          </div>
          <Link
            href={`/buchungsanfragen?item=${encodeURIComponent(item.name)}`}
            className="shrink-0 rounded-full border border-forest/20 px-3 py-2 text-xs font-bold text-forest transition hover:bg-forest hover:text-white"
          >
            Termin anfragen
          </Link>
        </div>
      </div>
    </article>
  );
}

function SectionNotice({ title }: { title: string }) {
  if (title === "Beispielmenüs") {
    return (
      <div className="mb-6 rounded-2xl border border-amber-300/80 bg-amber-50/75 px-5 py-4 text-sm leading-relaxed text-ink/85">
        <p className="font-extrabold text-forest">
          Hinweis zum Geschirr bei Beispielmenüs:
        </p>
        <p className="mt-1">
          Bei unseren <strong className="font-bold text-forest">Beispielmenüs</strong> ist das Geschirr{" "}
          <strong className="font-bold text-forest">nicht im Preis enthalten</strong> – genauso wie wenn Sie sich Ihr{" "}
          <strong className="font-bold text-forest">Menü selbst zusammenstellen</strong>. Teller und Besteck (inklusive
          Endreinigung) können Sie auf Wunsch gerne für{" "}
          <strong className="font-bold text-forest">2,50 € pro Person</strong> dazubuchen.
        </p>
      </div>
    );
  }

  if (title === "Menü selber gestalten") {
    return (
      <div className="mb-6 rounded-2xl border border-amber-300/80 bg-amber-50/75 px-5 py-4 text-sm leading-relaxed text-ink/85">
        <p className="font-extrabold text-forest">
          Individuelles Menü selbst zusammenstellen – mindestens 3 Fleischsorten & Hinweis zum Geschirr:
        </p>
        <p className="mt-1">
          Wenn Sie sich ein <strong className="font-bold text-forest">Individuelles Menü</strong> selbst zusammenstellen
          (Grundpreis 10,00 € p. P. zzgl. gewählter Spezialitäten), müssen{" "}
          <strong className="font-bold text-forest">mindestens 3 Fleischsorten</strong> ausgewählt werden. Das{" "}
          <strong className="font-bold text-forest">Geschirr ist – genau wie bei den Beispielmenüs – nicht automatisch dabei</strong>{" "}
          und kann jederzeit für <strong className="font-bold text-forest">2,50 € pro Person</strong> dazugebucht werden.
        </p>
      </div>
    );
  }

  if (title === "Komplett-Sparmenüs") {
    return (
      <div className="mb-6 rounded-2xl border border-forest/15 bg-forest/5 px-5 py-3.5 text-sm leading-relaxed text-ink/80">
        <strong className="font-bold text-forest">Inklusive Geschirr:</strong> Bei unseren Komplett-Sparmenüs werden
        Teller und Besteck kostenfrei zur Verfügung gestellt.
      </div>
    );
  }

  return null;
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${
        active ? "bg-forest text-gold" : "border border-forest/15 bg-white text-forest hover:border-forest/40"
      }`}
    >
      {label}
      <span className={`ml-1.5 text-xs font-medium ${active ? "text-gold/70" : "text-ink/40"}`}>{count}</span>
    </button>
  );
}

export default function MenuGallery({ items, showTabs = true }: { items: MenuItem[]; showTabs?: boolean }) {
  const [active, setActive] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const available = useMemo(() => new Set(items.flatMap((item) => item.categories)), [items]);
  const mainTabs = MAIN_CATEGORIES.filter((category) => available.has(category));
  const occasionTabs = OCCASIONS.filter((category) => available.has(category));

  const countFor = (tab: string) =>
    tab === ALL ? items.length : items.filter((item) => item.categories.includes(tab)).length;

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter((item) => {
      if (active !== ALL && !item.categories.includes(active)) return false;
      if (!term) return true;
      return `${item.name} ${item.description}`.toLowerCase().includes(term);
    });
  }, [items, active, query]);

  const groups = useMemo(() => {
    if (active !== ALL) return [{ title: active, items: visible }];
    return categoryOrder
      .map((title) => ({ title, items: visible.filter((item) => item.category === title) }))
      .filter((group) => group.items.length > 0);
  }, [active, visible]);

  return (
    <div>
      {showTabs && (
        <div className="mb-6 space-y-3">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
            {[ALL, ...mainTabs].map((tab) => (
              <FilterButton
                key={tab}
                label={tab}
                count={countFor(tab)}
                active={active === tab}
                onClick={() => setActive(tab)}
              />
            ))}
          </div>
          {occasionTabs.length > 0 && (
            <div className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
              <span className="shrink-0 pr-1 text-xs font-bold uppercase tracking-widest text-ink/50">Anlass:</span>
              {occasionTabs.map((tab) => (
                <FilterButton
                  key={tab}
                  label={tab}
                  count={countFor(tab)}
                  active={active === tab}
                  onClick={() => setActive(tab)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Gericht oder Zutat suchen …"
          className="w-full rounded-full border border-forest/15 bg-white px-5 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-leaf focus:ring-2 focus:ring-leaf/15"
        />
        <p className="text-xs text-ink/50">
          {visible.length} {visible.length === 1 ? "Angebot" : "Angebote"}
        </p>
      </div>

      {groups.map((group) => (
        <section key={group.title} className="mb-14 last:mb-0">
          {active === ALL && (
            <h2 className="display-font mb-5 flex items-baseline gap-3 border-b border-forest/10 pb-3 text-3xl font-bold text-forest">
              {group.title}
              <span className="text-sm font-normal text-ink/45">{group.items.length}</span>
            </h2>
          )}
          <SectionNotice title={group.title} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.items.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      ))}

      {visible.length === 0 && (
        <p className="py-16 text-center text-ink/55">Keine Angebote gefunden. Versuchen Sie einen anderen Suchbegriff.</p>
      )}
    </div>
  );
}
