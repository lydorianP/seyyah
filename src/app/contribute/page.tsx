"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLang } from "@/lib/i18n";

const schema = z.object({
  type: z.enum(["museum", "artifact"]),
  // Museum fields
  museumNameTr: z.string().optional(),
  museumNameEn: z.string().optional(),
  museumDescTr: z.string().optional(),
  museumDescEn: z.string().optional(),
  museumLat: z.number().optional(),
  museumLng: z.number().optional(),
  museumImage: z.string().optional(),
  // Artifact fields
  artifactTitleTr: z.string().optional(),
  artifactTitleEn: z.string().optional(),
  artifactDescTr: z.string().optional(),
  artifactDescEn: z.string().optional(),
  artifactLat: z.number().optional(),
  artifactLng: z.number().optional(),
  artifactImage: z.string().optional(),
  museumId: z.number().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContributePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLang();
  const [type, setType] = useState<"museum" | "artifact">("museum");
  const [museums, setMuseums] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "museum" },
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    // Fetch approved museums for artifact selection
    fetch("/api/museums")
      .then((res) => res.json())
      .then(setMuseums);
  }, [status, router]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    const payload =
      type === "museum"
        ? {
            name_tr: data.museumNameTr,
            name_en: data.museumNameEn || "",
            description_tr: data.museumDescTr || "",
            description_en: data.museumDescEn || "",
            lat: data.museumLat,
            lng: data.museumLng,
            image_url: data.museumImage || null,
          }
        : {
            museum_id: data.museumId,
            title_tr: data.artifactTitleTr,
            title_en: data.artifactTitleEn || "",
            description_tr: data.artifactDescTr || "",
            description_en: data.artifactDescEn || "",
            lat: data.artifactLat,
            lng: data.artifactLng,
            image_url: data.artifactImage || null,
          };

    try {
      const res = await fetch(`/api/contribute/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success(
        t("Katkınız alındı, onay bekleniyor.", "Contribution received, pending approval.")
      );
      reset();
    } catch (err) {
      toast.error(t("Bir hata oluştu.", "An error occurred."));
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") return null;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#e9ecef] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#0077b6" }}
        >
          {t("Katkıda Bulun", "Contribute")}
        </h1>

        {/* Type toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setType("museum")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              type === "museum"
                ? "bg-[#0077b6] text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-300 hover:border-[#0077b6]"
            }`}
          >
            {t("Yeni Müze", "New Museum")}
          </button>
          <button
            onClick={() => setType("artifact")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              type === "artifact"
                ? "bg-[#0077b6] text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-300 hover:border-[#0077b6]"
            }`}
          >
            {t("Yeni Eser", "New Artifact")}
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-xl shadow-md space-y-5"
        >
          {type === "museum" && (
            <>
              <input
                {...register("museumNameTr")}
                placeholder={t("Müze Adı (Türkçe)", "Museum Name (Turkish)")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
                required
              />
              <input
                {...register("museumNameEn")}
                placeholder={t("Müze Adı (İngilizce) - isteğe bağlı", "Museum Name (English) - optional")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
              <textarea
                {...register("museumDescTr")}
                placeholder={t("Açıklama (Türkçe)", "Description (Turkish)")}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
              <textarea
                {...register("museumDescEn")}
                placeholder={t("Açıklama (İngilizce) - isteğe bağlı", "Description (English) - optional")}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="any"
                  {...register("museumLat", { valueAsNumber: true })}
                  placeholder={t("Enlem", "Latitude")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
                  required
                />
                <input
                  type="number"
                  step="any"
                  {...register("museumLng", { valueAsNumber: true })}
                  placeholder={t("Boylam", "Longitude")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
                  required
                />
              </div>
              <input
                {...register("museumImage")}
                placeholder={t("Resim URL (opsiyonel)", "Image URL (optional)")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
            </>
          )}

          {type === "artifact" && (
            <>
              <select
                {...register("museumId", { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
                required
              >
                <option value="">
                  {t("Müze Seçin", "Select a museum")}
                </option>
                {museums.map((m: any) => (
                  <option key={m.id} value={m.id}>
                    {m.nameTr}
                  </option>
                ))}
              </select>
              <input
                {...register("artifactTitleTr")}
                placeholder={t("Eser Adı (Türkçe)", "Artifact Name (Turkish)")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
                required
              />
              <input
                {...register("artifactTitleEn")}
                placeholder={t("Eser Adı (İngilizce) - isteğe bağlı", "Artifact Name (English) - optional")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
              <textarea
                {...register("artifactDescTr")}
                placeholder={t("Açıklama (Türkçe)", "Description (Turkish)")}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
              <textarea
                {...register("artifactDescEn")}
                placeholder={t("Açıklama (İngilizce) - isteğe bağlı", "Description (English) - optional")}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="any"
                  {...register("artifactLat", { valueAsNumber: true })}
                  placeholder={t("Enlem", "Latitude")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
                />
                <input
                  type="number"
                  step="any"
                  {...register("artifactLng", { valueAsNumber: true })}
                  placeholder={t("Boylam", "Longitude")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
                />
              </div>
              <input
                {...register("artifactImage")}
                placeholder={t("Resim URL (opsiyonel)", "Image URL (optional)")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
              />
            </>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#ffb703] text-black font-bold py-3 rounded-lg hover:brightness-110 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting
              ? t("Gönderiliyor...", "Submitting...")
              : t("Katkımı Gönder", "Submit Contribution")}
          </button>
        </form>
      </div>
    </div>
  );
}