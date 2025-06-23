// app/country/[slug]/page.tsx
import { getCountryBySlug } from "@/lib/countryUtils";
import ChannelCard from "@/components/channelCard";
import { notFound } from "next/navigation";
import { Channel } from "@/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";

const LIMIT = 12;

export default async function CountryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  const country = getCountryBySlug(slug);
  if (!country) return notFound();

  const pageParams = parseInt(page || "1");
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/channels?country=${
      country.code === "GB" ? "uk" : country.code
    }&page=${pageParams}&limit=${LIMIT}`,
    { cache: "no-store" }
  );

  const { data: countryChannels, total } = await res.json();
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <main className="min-h-[65vh] max-w-screen-xl mx-auto px-4 py-10">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/country"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Countries
        </Link>
      </div>

      {/* Header */}
      <header className="flex items-center gap-4 mb-10">
        <div className="w-12 h-8 border rounded overflow-hidden">
          <FallbackImage
            src={country.flagUrl}
            alt={`Flag of ${country.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
          Channels from {country.name}
        </h1>
      </header>

      {/* Grid or message */}
      {countryChannels.length > 0 ? (
        <>
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {countryChannels.map((channel: Channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              {pageParams > 1 && (
                <Link
                  href={`/country/${slug}?page=${pageParams - 1}`}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  Previous
                </Link>
              )}
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Page {pageParams} of {totalPages}
              </span>
              {pageParams < totalPages && (
                <Link
                  href={`/country/${slug}?page=${pageParams + 1}`}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
          <p className="text-lg font-medium">
            No public channels found for {country.name}.
          </p>
        </div>
      )}
    </main>
  );
}
