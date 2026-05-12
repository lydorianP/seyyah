"use client";

import { useLang } from "@/lib/i18n";

export default function TosPage() {
  const { t } = useLang();

  const lang = useLang().lang; // current language

  const content = {
    title: t("Kullanım Şartları", "Terms of Service"),
    lastUpdated: t("Son güncelleme: 11 Mayıs 2026", "Last updated: May 11, 2026"),
    intro: t(
      "Seyyah'a hoş geldiniz. Bu kullanım şartları, platformumuzu kullanırken uymanız gereken kuralları ve haklarınızı açıklar. Sitemizi kullanarak bu şartları kabul etmiş sayılırsınız.",
      "Welcome to Seyyah. These Terms of Service explain the rules and your rights when using our platform. By using the site, you agree to these terms."
    ),
    sections: [
      {
        title: t("1. Genel Bakış", "1. Overview"),
        body: t(
          "Seyyah, Türkiye'deki kültürel mirasın haritalandığı, gönüllü katılımına dayalı, müze yetkililerinin onayından geçen bir platformdur. Tüm içerikler 2863, 5846 ve 5651 sayılı kanunlara uygun şekilde işlenir.",
          "Seyyah is a cultural heritage mapping platform based in Turkey, relying on volunteer contributions and museum authority approval. All content complies with Laws No. 2863, 5846 and 5651."
        ),
      },
      {
        title: t("2. Sorumluluklarınız", "2. Your Responsibilities"),
        body: t(
          "Platforma içerik eklerken, eklediğiniz fotoğraf ve bilgilerin size ait olduğunu veya gerekli izinleri aldığınızı taahhüt edersiniz. Kültür varlıkları fotoğrafları için ilgili müze müdürlüğünden izin almak sizin sorumluluğunuzdadır. Başkasının kişisel verilerini ifşa etmeyeceğinizi kabul edersiniz.",
          "By contributing content, you guarantee that the photos and information you submit are your own or you have obtained necessary permissions. It is your responsibility to obtain permission from the relevant museum directorate for photographs of cultural properties. You agree not to disclose others' personal data."
        ),
      },
      {
        title: t("3. Lisans ve Kullanım", "3. License and Use"),
        body: t(
          "Katkıda bulunduğunuz içerikler, platformda kalıcı olarak sergilenebilir. İçeriğinizi istediğiniz zaman kaldırmamızı talep edebilirsiniz; ancak müze yetkilisi tarafından onaylanmış arşiv niteliğindeki kayıtlar, kamu yararı gereği anonimleştirilerek kalabilir.",
          "Your contributed content may be displayed permanently on the platform. You may request removal of your content at any time; however, archival records approved by a museum authority may remain for public interest, in anonymised form."
        ),
      },
      {
        title: t("4. Hukuki Uyum", "4. Legal Compliance"),
        body: t(
          "Platform, 5651 sayılı İnternet Yasası kapsamında 'içerik sağlayıcı' olarak hareket eder. Telif hakkı ihlali veya kişilik haklarına saldırı durumunda 'haber ver - kaldır' mekanizması ile en kısa sürede müdahale ederiz. İhlal bildirimlerinizi info@seyyah.com adresine yapabilirsiniz.",
          "The platform acts as a 'content provider' under Law No. 5651. In case of copyright infringement or violation of personal rights, we follow a 'notice and takedown' procedure. Send infringement notices to info@seyyah.com."
        ),
      },
      {
        title: t("5. Gizlilik ve KVKK", "5. Privacy and Data Protection"),
        body: t(
          "Yalnızca hizmetin sunulabilmesi için gerekli olan asgari kişisel veriyi toplarız. Hiçbir izleme çerezi, reklam veya profil çıkarma yapılmaz. Verileriniz üçüncü taraflarla paylaşılmaz. KVKK'nın 11. maddesi kapsamındaki tüm haklarınızı kullanabilirsiniz.",
          "We collect only the minimum personal data necessary to provide the service. No tracking cookies, advertisements, or profiling. Your data is never shared with third parties. You can exercise all your rights under Article 11 of the KVKK."
        ),
      },
    ],
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[var(--bg)] text-[var(--text)] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1E4A8C] mb-2">{content.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{content.lastUpdated}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{content.intro}</p>
        <div className="space-y-6">
          {content.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-[#1E4A8C] mb-2">{s.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-10 text-center">
          Seyyah © 2026 – Kültürel miras hepimizin.
        </p>
      </div>
    </div>
  );
}