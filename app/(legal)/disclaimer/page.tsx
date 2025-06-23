import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | FreePublicTV",
  description: "Important information about FreePublicTV's content and usage.",
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

      <p className="mb-4">
        FreePublicTV does not host, store, or stream any media content. All TV
        channels and streams listed on this site are sourced from publicly
        available information aggregated by the open-source{" "}
        <a
          href="https://github.com/iptv-org/iptv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          IPTV-org project
        </a>
        .
      </p>

      <p className="mb-4">
        We are not affiliated with or endorsed by any TV channel, broadcaster,
        or media company. All trademarks, logos, and content remain the property
        of their respective owners.
      </p>

      <p className="mb-4">
        This service is intended for informational and educational use only.
        Users are solely responsible for ensuring their use complies with
        applicable laws in their country or region.
      </p>

      <p className="mb-4">
        If you are a copyright holder and believe that a stream or listing
        violates your rights, please note that all data is maintained by the
        IPTV-org project. You may submit a{" "}
        <strong>DMCA takedown request</strong> directly to their GitHub
        repository:{" "}
        <a
          href="https://github.com/iptv-org/iptv/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          https://github.com/iptv-org/iptv/issues
        </a>
        .
      </p>

      <p className="mb-4">
        ⚠️ Please be aware that due to caching and propagation delays, changes
        (such as channel removals) made to the IPTV-org repository may take some
        time to reflect on this website.
      </p>

      <p className="mt-8 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}
