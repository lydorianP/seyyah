import { NextResponse } from "next/server";
import postgres from "postgres";
import { auth } from "@/auth";

const sql = postgres(process.env.DATABASE_URL!);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user?.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;          // ← await the promise
  const { action } = await req.json();
  const museumId = parseInt(id, 10);

  if (action === "approve") {
    await sql`UPDATE museum SET status = 'approved' WHERE id = ${museumId}`;
  } else if (action === "reject") {
    await sql`UPDATE museum SET status = 'rejected' WHERE id = ${museumId}`;
  }

  return NextResponse.json({ success: true });
}