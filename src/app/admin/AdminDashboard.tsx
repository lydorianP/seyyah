"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [pendingMuseums, setPendingMuseums] = useState<any[]>([]);
  const [pendingArtifacts, setPendingArtifacts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/pending")
      .then(res => res.json())
      .then(data => {
        setPendingMuseums(data.museums || []);
        setPendingArtifacts(data.artifacts || []);
      });
  }, []);

  const handleAction = async (type: "museum" | "artifact", id: number, action: "approve" | "reject") => {
    const res = await fetch(`/api/admin/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      toast.success(`${action === 'approve' ? 'Onaylandı' : 'Reddedildi'}`);
      router.refresh();
    } else {
      toast.error("İşlem başarısız");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#0077b6" }}>Admin Paneli</h1>

      <h2 className="text-xl font-semibold mb-3">Onay Bekleyen Müzeler</h2>
      {pendingMuseums.map((museum: any) => (
        <div key={museum.id} className="border p-4 mb-3 rounded shadow-sm">
          <h3 className="font-bold">{museum.name_tr}</h3>
          <p className="text-sm">{museum.description_tr?.slice(0, 100)}...</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleAction("museum", museum.id, "approve")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Onayla
            </button>
            <button
              onClick={() => handleAction("museum", museum.id, "reject")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reddet
            </button>
          </div>
        </div>
      ))}

      <h2 className="text-xl font-semibold mb-3 mt-6">Onay Bekleyen Eserler</h2>
      {pendingArtifacts.map((art: any) => (
        <div key={art.id} className="border p-4 mb-3 rounded shadow-sm">
          <h3 className="font-bold">{art.title_tr}</h3>
          <p className="text-sm">{art.description_tr?.slice(0, 100)}...</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleAction("artifact", art.id, "approve")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Onayla
            </button>
            <button
              onClick={() => handleAction("artifact", art.id, "reject")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reddet
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}