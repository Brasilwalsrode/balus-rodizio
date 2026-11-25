import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureDatabase } from "@/db/ensure";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = new Set(["offen", "bestaetigt", "abgelehnt"]);

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
      return Response.json({ ok: false, error: "Ungültige Anfrage-ID." }, { status: 400 });
    }

    const body = await request.json();
    const nextStatus = body.status !== undefined ? String(body.status).trim() : undefined;
    const nextAdminNote = body.adminNote !== undefined ? String(body.adminNote).trim() : undefined;

    if (nextStatus !== undefined && !ALLOWED_STATUSES.has(nextStatus)) {
      return Response.json({ ok: false, error: "Ungültiger Buchungsstatus." }, { status: 400 });
    }

    await ensureDatabase();

    const updateFields: {
      status?: string;
      adminNote?: string;
      updatedAt: Date;
    } = { updatedAt: new Date() };

    if (nextStatus !== undefined) updateFields.status = nextStatus;
    if (nextAdminNote !== undefined) updateFields.adminNote = nextAdminNote;

    const [updated] = await db
      .update(inquiries)
      .set(updateFields)
      .where(eq(inquiries.id, numericId))
      .returning();

    if (!updated) {
      return Response.json({ ok: false, error: "Buchungsanfrage nicht gefunden." }, { status: 404 });
    }

    return Response.json({ ok: true, inquiry: updated });
  } catch {
    return Response.json(
      { ok: false, error: "Status der Buchungsanfrage konnte nicht aktualisiert werden." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
      return Response.json({ ok: false, error: "Ungültige Anfrage-ID." }, { status: 400 });
    }

    await ensureDatabase();
    const [deleted] = await db
      .delete(inquiries)
      .where(eq(inquiries.id, numericId))
      .returning({ id: inquiries.id });

    if (!deleted) {
      return Response.json({ ok: false, error: "Buchungsanfrage nicht gefunden." }, { status: 404 });
    }

    return Response.json({ ok: true, id: deleted.id });
  } catch {
    return Response.json({ ok: false, error: "Eintrag konnte nicht gelöscht werden." }, { status: 500 });
  }
}
