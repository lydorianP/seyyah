import { NextResponse } from "next/server";
import { auth } from "@/auth";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { museum_id, title_tr, title_en, description_tr, description_en, lat, lng, image_url } = body;
  if (!museum_id || !title_tr) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await sql`
    INSERT INTO artifact (museum_id, title_tr, title_en, description_tr, description_en, lat, lng, image_url, status)
    VALUES (${museum_id}, ${title_tr}, ${title_en || ""}, ${description_tr || ""}, ${description_en || ""}, ${lat || null}, ${lng || null}, ${image_url || null}, 'pending')
  `;
  return NextResponse.json({ success: true });
}