import { NextResponse } from "next/server";
import postgres from "postgres";
import { auth } from "@/auth";

const sql = postgres(process.env.DATABASE_URL!);

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const museums = await sql`SELECT * FROM museum WHERE status = 'pending'`;
  const artifacts = await sql`SELECT * FROM artifact WHERE status = 'pending'`;
  return NextResponse.json({ museums, artifacts });
}