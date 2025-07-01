import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | FreePublicTV",
  description: "Learn more about FreePublicTV, our mission, and our goals.",
};
export default function AboutPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-20 text-white  min-h-[57vh]">
      <h1 className="text-3xl font-bold mb-4">About FreePublicTV</h1>
      <p className="mb-4">
        FreePublicTV is a global discovery platform for streaming public domain
        and freely available TV channels from around the world.
      </p>
      <p className="mb-4">
        All streams are sourced from publicly accessible data provided by the
        open-source community at
        <a
          href="https://github.com/iptv-org/iptv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {" "}
          iptv-org
        </a>
        . We do not host or own any of the streams displayed on this website.
      </p>
      <p>
        Our goal is to make free television content more accessible while
        respecting the rights of original broadcasters.
      </p>
    </main>
  );
}
