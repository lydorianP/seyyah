"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLang } from "@/lib/i18n";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      toast.success(
        t("Kayıt başarılı! Giriş yapabilirsiniz.", "Registration successful! You can log in now.")
      );
      router.push("/login");
    } else {
      const data = await res.json();
      toast.error(data.error || t("Kayıt başarısız", "Registration failed"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-start justify-center bg-[#e9ecef] pt-16 px-4">
      <div className="w-full max-w-[280px]">
        <div className="flex justify-center mb-6">
          <img src="/favicon.ico" alt="Seyyah" className="w-6 h-6" />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg px-5 py-6">
          <h1 className="text-lg font-semibold text-center text-gray-900 mb-4">
            {t("Seyyah'a kaydol", "Create your account")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {t("Ad Soyad (opsiyonel)", "Full name (optional)")}
              </label>
              <input
                type="text"
                maxLength={32}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4A8C] focus:border-transparent"
                placeholder={t("Adınız", "Your name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {t("Email adresi", "Email address")}
              </label>
              <input
                type="email"
                maxLength={32}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4A8C] focus:border-transparent"
                placeholder={t("Email", "Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {t("Şifre", "Password")}
              </label>
              <input
                type="password"
                maxLength={32}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4A8C] focus:border-transparent"
                placeholder={t("Şifre", "Password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-[#1E4A8C] text-white font-semibold hover:bg-[#163A6B] transition"
            >
              {t("Hesap oluştur", "Create account")}
            </button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {t("Zaten hesabınız var mı?", "Already have an account?")}{" "}
            <a href="/login" className="text-[#1E4A8C] font-semibold hover:underline">
              {t("Giriş yap", "Sign in")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}