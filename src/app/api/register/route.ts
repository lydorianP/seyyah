import { NextResponse } from "next/server";
import postgres from "postgres";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const existing = await sql`SELECT * FROM "user" WHERE email = ${email}`;
  if (existing.length > 0) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const id = crypto.randomUUID();
  await sql`
    INSERT INTO "user" (id, email, name, role, password)
    VALUES (${id}, ${email}, ${name || email.split('@')[0]}, 'volunteer', ${hashedPassword})
  `;

  return NextResponse.json({ success: true });
}