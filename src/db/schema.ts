import { pgTable, text, integer, doublePrecision, serial } from "drizzle-orm/pg-core";

export const museums = pgTable("museum", {
  id: serial("id").primaryKey(),
  nameTr: text("name_tr").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionTr: text("description_tr"),
  descriptionEn: text("description_en"),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  imageUrl: text("image_url"), // /public veya web URL
  website: text("website"),
});

export const artifacts = pgTable("artifact", {
  id: serial("id").primaryKey(),
  museumId: integer("museum_id").references(() => museums.id, { onDelete: "cascade" }),
  titleTr: text("title_tr").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionTr: text("description_tr"),
  descriptionEn: text("description_en"),
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
});