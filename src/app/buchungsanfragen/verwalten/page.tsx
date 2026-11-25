import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { inquiries, type Inquiry } from "@/db/schema";
import { ensureDatabase } from "@/db/ensure";
import BookingsManager from "@/components/BookingsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Buchungsanfragen verwalten & bestätigen | Balus Rodizio",
  description:
    "Übersicht aller eingegangenen Buchungsanfragen von Balus Rodizio zur Prüfung und Bestätigung freier Termine.",
};

export default async function BuchungsanfragenVerwaltenPage() {
  let rows: Inquiry[] = [];
  try {
    await ensureDatabase();
    rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(200);
  } catch (error) {
    console.error("Buchungsanfragen konnten nicht geladen werden:", error);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-deep py-14 md:py-18">
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-forest/90 to-deep" />
        <div className="container-wide relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.25em] text-gold">
              Team-Übersicht · Terminprüfung
            </p>
            <h1 className="display-font text-3xl font-bold text-white md:text-5xl">
              Buchungsanfragen prüfen & bestätigen
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
              Hier sehen Sie alle angefragten Wunschtermine Ihrer Kunden. Prüfen Sie, ob der Termin in Ihren Kalender
              passt, und markieren Sie die Anfrage als bestätigt oder abgelehnt.
            </p>
          </div>
          <Link
            href="/buchungsanfragen"
            className="self-start rounded-full border border-white/30 px-5 py-2.5 text-xs font-extrabold text-white transition hover:border-gold hover:text-gold md:self-auto"
          >
            ← Zum Kundenformular
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-wide">
          <BookingsManager initialInquiries={rows} />
        </div>
      </section>
    </>
  );
}
