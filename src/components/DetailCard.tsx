"use client";

import { useLang } from "@/lib/i18n";

interface DetailCardProps {
  museum: any;
  onClose: () => void;
}

export default function DetailCard({ museum, onClose }: DetailCardProps) {
  const { t } = useLang();

  const imageSrc =
    museum.imageUrl ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400";  // fallback works

  return (
    <div className="relative h-full bg-white">
      {/* Close button – floating over the photo */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition text-lg leading-none"
        aria-label={t("Kapat", "Close")}
      >
        ✕
      </button>

      {/* Photo */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={t(museum.nameTr, museum.nameEn)}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Museum name */}
      <div className="px-6 pt-5 pb-1">
        <h2 className="text-2xl font-bold text-[#1E4A8C] tracking-tight">
          {t(museum.nameTr, museum.nameEn)}
        </h2>
      </div>

      {/* Description */}
      <div className="px-6 pb-6">
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {t(museum.descriptionTr, museum.descriptionEn)}
        </p>
      </div>

      {/* Footer without coordinates, with translatable category */}
      <div className="px-6 pb-5 mt-auto flex justify-end">
        <span className="text-xs font-medium text-[#FF6B00] uppercase tracking-wide">
          {t("Müze", "Museum")}
        </span>
      </div>
    </div>
  );
}