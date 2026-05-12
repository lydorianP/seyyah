import { NextResponse } from "next/server";
import postgres from "postgres";

const connectionString = "postgresql://postgres:admin@localhost:5432/seyyah";

export async function GET() {
  try {
    const sql = postgres(connectionString, { max: 1 });

    const museums = await sql`SELECT * FROM museum`;

    const withArtifacts = await Promise.all(
      museums.map(async (museum: any) => {
        const arts = await sql`
          SELECT * FROM artifact WHERE museum_id = ${museum.id}
        `;
        const camelArts = arts.map((art: any) => ({
          id: art.id,
          museumId: art.museum_id,
          titleTr: art.title_tr,
          titleEn: art.title_en,
          descriptionTr: art.description_tr,
          descriptionEn: art.description_en,
          lat: art.lat,
          lng: art.lng,
          imageUrl: art.image_url,   // ← yeni eklenen alan
        }));
        return {
          id: museum.id,
          nameTr: museum.name_tr,
          nameEn: museum.name_en,
          descriptionTr: museum.description_tr,
          descriptionEn: museum.description_en,
          lat: museum.lat,
          lng: museum.lng,
          imageUrl: museum.image_url,
          artifacts: camelArts,
        };
      })
    );

    await sql.end();
    return NextResponse.json(withArtifacts);
  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}