import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FreePublicTV",
  description: "Terms of service for FreePublicTV regarding usage and content.",
};
export default function TermsPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

      <p className="mb-4">
        By accessing and using FreePublicTV, you agree to be bound by the
        following terms and conditions. If you do not agree with any part of
        these terms, please do not use the site.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Use of Service</h2>
      <p className="mb-4">
        FreePublicTV is a free platform for discovering and streaming publicly
        available TV channels. We do not host or store any video content. All
        streams are sourced from publicly accessible third-party services such
        as IPTV-org.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. No Guarantee of Availability
      </h2>
      <p className="mb-4">
        We do not guarantee that any stream or channel will be available at all
        times. Streams may go offline, be removed, or become outdated due to
        external sources.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        3. Intellectual Property
      </h2>
      <p className="mb-4">
        All channel logos, names, and content belong to their respective owners.
        We claim no ownership over any third-party content linked or displayed
        on this platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Prohibited Use</h2>
      <p className="mb-4">
        You agree not to misuse the platform, engage in automated scraping, or
        attempt to redistribute stream URLs for commercial purposes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        5. Limitation of Liability
      </h2>
      <p className="mb-4">
        FreePublicTV is provided &quot;as is&quot; without warranties of any
        kind. We are not liable for any damages or losses arising from the use
        or inability to use the service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms at any time. Continued use of the site after
        changes are posted constitutes your acceptance of the updated terms.
      </p>

      <p className="mt-10 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>
    </main>
  );
}
