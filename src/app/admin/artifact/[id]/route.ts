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
  const artifactId = parseInt(id, 10);

  if (action === "approve") {
    await sql`UPDATE artifact SET status = 'approved' WHERE id = ${artifactId}`;
  } else if (action === "reject") {
    await sql`UPDATE artifact SET status = 'rejected' WHERE id = ${artifactId}`;
  }

  return NextResponse.json({ success: true });
}