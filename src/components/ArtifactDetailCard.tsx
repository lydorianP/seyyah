"use client";

import { useLang } from "@/lib/i18n";

interface ArtifactDetailCardProps {
  artifact: any;
  onClose: () => void;
}

export default function ArtifactDetailCard({ artifact, onClose }: ArtifactDetailCardProps) {
  const { t } = useLang();

  // Reliable fallback: use museum image, or a generic artifact placeholder
  const imageSrc =
    artifact.imageUrl ||
    artifact.museumImage ||
    "https://images.unsplash.com/photo-1566454419293-14f6a4c7b09b?w=400"; // generic artifact

  return (
    <div className="relative h-full bg-white">
      {/* Close button */}
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
          alt={t(artifact.titleTr, artifact.titleEn)}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Artifact title */}
      <div className="px-6 pt-5 pb-1">
        <h2 className="text-2xl font-bold text-[#1E4A8C] tracking-tight">
          {t(artifact.titleTr, artifact.titleEn)}
        </h2>
        {artifact.museumName && (
          <p className="text-sm text-gray-500 mt-0.5">
            {typeof artifact.museumName === "object"
              ? t(artifact.museumName.tr, artifact.museumName.en)
              : artifact.museumName}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="px-6 pb-6">
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {t(artifact.descriptionTr, artifact.descriptionEn)}
        </p>
      </div>

      {/* Footer without coordinates, with translatable category */}
      <div className="px-6 pb-5 mt-auto flex justify-end">
        <span className="text-xs font-medium text-[#FF6B00] uppercase tracking-wide">
          {t("Eser", "Artifact")}
        </span>
      </div>
    </div>
  );
}