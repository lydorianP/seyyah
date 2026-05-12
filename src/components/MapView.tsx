"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import DetailCard from "./DetailCard";
import ArtifactDetailCard from "./ArtifactDetailCard";
import { useTheme } from "next-themes";

const museumIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='16' fill='%230077b6' stroke='%23ffb703' stroke-width='2.5'/%3E%3Ctext x='18' y='24' text-anchor='middle' fill='white' font-size='16'%3E🏛%3C/text%3E%3C/svg%3E",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const artifactIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26'%3E%3Ccircle cx='13' cy='13' r='11' fill='%23ffb703' stroke='%230077b6' stroke-width='2'/%3E%3Ctext x='13' y='18' text-anchor='middle' fill='black' font-size='11'%3E🏺%3C/text%3E%3C/svg%3E",
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -26],
});

function FitBounds({ museums }: { museums: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (museums.length > 0) {
      const bounds = L.latLngBounds(
        museums.map((m) => [m.lat, m.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [museums, map]);
  return null;
}

export default function MapView() {
  const [museums, setMuseums] = useState<any[]>([]);
  const [selectedMuseum, setSelectedMuseum] = useState<any | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<any | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    fetch("/api/museums")
      .then((res) => res.json())
      .then(setMuseums)
      .catch(console.error);
  }, []);

  const handleMuseumClick = (museum: any) => {
    setSelectedMuseum(museum);
    setSelectedArtifact(null);
  };

  const handleArtifactClick = (artifact: any) => {
    setSelectedArtifact(artifact);
    setSelectedMuseum(null);
  };

  const enrichedArtifacts = museums.flatMap((museum) =>
    (museum.artifacts || []).map((art: any) => ({
      ...art,
      museumImage: museum.imageUrl,
    }))
  );

  return (
    <div className="flex h-[calc(100vh-56px)]">
      <div className="flex-1 h-full relative">
        <MapContainer
          center={[38.44, 27.14]}
          zoom={12}
          maxZoom={24}                // allow super‑close zooming
          style={{ height: "100%", width: "100%" }}
        >
          {/* High‑zoom tile layer: Stadia Alidade Smooth goes to zoom 20 natively, then we over‑zoom gracefully */}
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            maxZoom={24}
            maxNativeZoom={20}
            className={isDark ? "dark-map-tiles" : ""}
          />

          {/* Museum markers */}
          {museums.map((museum) => (
            <Marker
              key={`museum-${museum.id}`}
              position={[museum.lat, museum.lng]}
              icon={museumIcon}
              eventHandlers={{
                click: () => handleMuseumClick(museum),
              }}
            />
          ))}

          {/* Artifact markers */}
          {enrichedArtifacts.map((art: any) => (
            <Marker
              key={`art-${art.id}`}
              position={[art.lat, art.lng]}
              icon={artifactIcon}
              eventHandlers={{
                click: () => handleArtifactClick(art),
              }}
            />
          ))}

          <FitBounds museums={museums} />
        </MapContainer>
      </div>

      {/* Right panel: Museum or Artifact detail */}
      {selectedMuseum && (
        <div className="w-[420px] border-l-2 border-[#0077b6] bg-white h-full overflow-y-auto shadow-2xl z-10">
          <DetailCard museum={selectedMuseum} onClose={() => setSelectedMuseum(null)} />
        </div>
      )}
      {selectedArtifact && (
        <div className="w-[420px] border-l-2 border-[#0077b6] bg-white h-full overflow-y-auto shadow-2xl z-10">
          <ArtifactDetailCard artifact={selectedArtifact} onClose={() => setSelectedArtifact(null)} />
        </div>
      )}
    </div>
  );
}