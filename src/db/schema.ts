import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  // Hauptbereich: bestimmt die Gruppe in der Gesamtansicht
  category: text("category").notNull(),
  // Alle Bereiche und Anlässe (Hochzeit, Geburtstag, ...), in denen das Angebot erscheint
  categories: text("categories").array().notNull().default(sql`'{}'::text[]`),
  // null = Preis auf Anfrage
  priceCents: integer("price_cents"),
  priceUnit: text("price_unit"),
  description: text("description").notNull().default(""),
  image: text("image"),
  badge: text("badge"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  selectedMenu: text("selected_menu").notNull().default(""),
  eventType: text("event_type").notNull().default(""),
  eventDate: text("event_date").notNull().default(""),
  eventTime: text("event_time").notNull().default(""),
  guests: text("guests").notNull().default(""),
  eventLocation: text("event_location").notNull().default(""),
  // Einfache Fahrtstrecke ab Walsrode in km (0..200)
  distanceKm: integer("distance_km").notNull().default(0),
  // Berechnete Kilometer-/Ressourceneinsatz-Pauschale in Cent (bis 5 km = 0, ab 6 km = (km - 5) * 100)
  travelFeeCents: integer("travel_fee_cents").notNull().default(0),
  message: text("message").notNull().default(""),
  // Buchungsstatus: "offen" (Terminprüfung ausstehend) | "bestaetigt" | "abgelehnt"
  status: text("status").notNull().default("offen"),
  adminNote: text("admin_note").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
