import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA Policy | FreePublicTV",
  description:
    "DMCA policy for FreePublicTV regarding content and copyright issues.",
};

export default function DMCA() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-bold mb-6">DMCA Policy</h1>

      <p className="mb-4">
        FreePublicTV aggregates publicly available TV streams from open-source
        repositories, including{" "}
        <a
          href="https://github.com/iptv-org/iptv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          iptv-org
        </a>
        . We do not host or control any media streams directly.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Takedown Requests</h2>
      <p className="mb-4">
        If you are a copyright holder and believe a stream on FreePublicTV
        violates your rights, please be aware that:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          We do <strong>not</strong> host any video or audio content ourselves.
        </li>
        <li>
          All stream links are pulled from the{" "}
          <a
            href="https://github.com/iptv-org/iptv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            iptv-org GitHub repository
          </a>
          .
        </li>
        <li>
          Takedown requests must be submitted directly to iptv-org by opening an
          issue on their GitHub repository or following their process outlined{" "}
          <a
            href="https://github.com/iptv-org/iptv?tab=readme-ov-file#legal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            here
          </a>
          .
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Disclaimer</h2>
      <p className="mb-4">
        FreePublicTV has no control over the availability, legality, or content
        of the streams listed. If a stream is removed from the source, it will
        eventually stop appearing on our platform as our data refreshes.
      </p>

      <p className="mt-10 text-sm text-slate-500">
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>
    </main>
  );
}
