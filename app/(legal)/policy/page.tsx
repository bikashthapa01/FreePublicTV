import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | FreePublicTV",
  description:
    "Privacy policy for FreePublicTV regarding user data and cookies.",
};
export default function PrivacyPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At FreePublicTV, your privacy is important to us. This Privacy Policy
        explains how we collect, use, and protect your information when you use
        our website.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We do not collect any personally identifiable information (PII) from
        users. Basic server logs or analytics data may be collected to
        understand general usage trends (e.g., page views, browser type,
        country).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Cookies</h2>
      <p className="mb-4">
        We may use cookies or local storage for functional purposes (like
        remembering theme preferences). No advertising or tracking cookies are
        used.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        3. Third-Party Services
      </h2>
      <p className="mb-4">
        We rely on publicly available data from external sources such as
        iptv-org. We do not control how these third-party services collect or
        use data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. No User Accounts</h2>
      <p className="mb-4">
        FreePublicTV does not require users to register or log in. We do not
        store passwords, emails, or user profiles.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        5. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this privacy policy occasionally. Updates will be posted
        on this page, and the effective date will be updated below.
      </p>

      <p className="mt-10 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>
    </main>
  );
}
