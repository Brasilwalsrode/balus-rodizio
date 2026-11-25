import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balus Rodizio | Catering, Partyservice & mobile Cocktails in Walsrode",
  description:
    "Rodizio-Catering, Partyservice und mobile Cocktailbar ab 25 Personen im Umkreis von 200 km ab Walsrode. Menüs ab 20 € pro Person.",
  keywords: ["Rodizio", "Catering", "Partyservice", "Walsrode", "Heidekreis", "mobile Cocktails", "Hochzeit"],
  icons: {
    icon: "/images/fav-balu-01.jpg",
    apple: "/images/fav-balu-01.jpg",
  },
  openGraph: {
    title: "Balus Rodizio – Catering & Partyservice Walsrode",
    description: "Rodizio vom Spieß, Salate, Dips und mobile Cocktailbar im Umkreis von 200 km ab Walsrode.",
    images: ["/images/logo-balus-rodizio.png"],
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-cream text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
