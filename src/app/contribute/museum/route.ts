import { NextResponse } from "next/server";
import { auth } from "@/auth";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name_tr, name_en, description_tr, description_en, lat, lng, image_url } = body;
  if (!name_tr || lat == null || lng == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await sql`
    INSERT INTO museum (name_tr, name_en, description_tr, description_en, lat, lng, image_url, status)
    VALUES (${name_tr}, ${name_en || ""}, ${description_tr || ""}, ${description_en || ""}, ${lat}, ${lng}, ${image_url || null}, 'pending')
  `;
  return NextResponse.json({ success: true });
}