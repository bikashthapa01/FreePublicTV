// app/channels/page.tsx
import ChannelCard from "@/components/channelCard";
import Link from "next/link";
import { type Channel } from "@/types";

const LIMIT = 12;

export default async function ChannelsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { page: pageStr = "1", q = "" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr));
  const query = q;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/channels?page=${page}&limit=${LIMIT}&q=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  const { data: channels, total } = await res.json();
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">
            All Channels
          </h1>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {total} channel{total !== 1 && "s"} found
          </span>
        </div>

        <form
          action="/channels"
          method="GET"
          className="w-full sm:w-auto flex items-center gap-2 flex-wrap"
        >
          <input
            type="text"
            name="q"
            placeholder="Search channels..."
            defaultValue={query}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
          >
            Search
          </button>

          {query && (
            <Link
              href="/channels"
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition text-sm text-slate-800 dark:text-white"
            >
              Reset
            </Link>
          )}
        </form>
      </div>

      {channels.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {channels.map((channel: Channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              {page > 1 && (
                <Link
                  href={`/channels?q=${encodeURIComponent(query)}&page=${
                    page - 1
                  }`}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  Previous
                </Link>
              )}
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/channels?q=${encodeURIComponent(query)}&page=${
                    page + 1
                  }`}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-slate-600 dark:text-slate-400 text-center">
          No channels found for “{query}”.
        </p>
      )}
    </main>
  );
}
