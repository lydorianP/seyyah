"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/harita";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: true,
    });
  };

  const errorMessage = () => {
    if (error === "CredentialsSignin") {
      return t("Hatalı kullanıcı adı veya şifre", "Invalid username or password");
    }
    if (error) {
      return t("Bir hata oluştu, lütfen tekrar deneyin", "An error occurred, please try again");
    }
    return null;
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-start justify-center bg-[#e9ecef] pt-16 px-4">
      <div className="w-full max-w-[280px]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/favicon.ico" alt="Seyyah" className="w-12 h-12" />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg px-5 py-6">
          <h1 className="text-lg font-semibold text-center text-gray-900 mb-4">
            {t("Seyyah'a giriş yap", "Sign in to Seyyah")}
          </h1>

          {errorMessage() && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
              {errorMessage()}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
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
              {t("Giriş yap", "Sign in")}
            </button>
          </form>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {t("Seyyah'ta yeni misiniz?", "New to Seyyah?")}{" "}
            <a href="/register" className="text-[#1E4A8C] font-semibold hover:underline">
              {t("Hesap oluştur", "Create an account")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}