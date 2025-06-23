import ChannelCard from "@/components/channelCard";
import { notFound } from "next/navigation";
import { Channel } from "@/types";
import Link from "next/link";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";

const ITEMS_PER_PAGE = 20;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}

// app/category/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const paramsResolved = await params;
  const slug = paramsResolved.slug;

  const name = capitalize(slug);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: `Watch ${name} Channels | FreePublicTV`,
    description: `Browse and stream live public TV channels in the ${name} category.`,
    openGraph: {
      title: `Watch ${name} Channels | FreePublicTV`,
      description: `Explore top free-to-air channels in the ${name} category.`,
      url: `${baseURL}/category/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Watch ${name} Channels | FreePublicTV`,
      description: `Stream channels in the ${name} category anytime.`,
    },
  };
}

// --- Category Page ---
export default async function CategoryPage({
  params,
  searchParams = Promise.resolve({ page: "1" }),
}: CategoryPageProps) {
  const paramsResolved = await params;
  const categorySlug = paramsResolved.slug;
  const page = parseInt((await searchParams).page || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(
    `${baseURL}/api/channels?category=${categorySlug}&offset=${offset}&limit=${ITEMS_PER_PAGE}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const result = await res.json();
  const channels: Channel[] = result.data || [];
  const total = result.total || 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const categoryName = capitalize(categorySlug);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          {categoryName} Channels
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          {total} channel{total !== 1 && "s"} found in &quot;{categoryName}
          &quot;
        </p>
      </header>

      {channels.length > 0 ? (
        <>
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </section>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              {page > 1 && (
                <Link
                  href={`/category/${categorySlug}?page=${page - 1}`}
                  className="px-4 py-2 rounded bg-slate-800 text-white hover:bg-slate-700 transition text-sm"
                >
                  ← Previous
                </Link>
              )}
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/category/${categorySlug}?page=${page + 1}`}
                  className="px-4 py-2 rounded bg-slate-800 text-white hover:bg-slate-700 transition text-sm"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-slate-500 dark:text-slate-400 py-20">
          No channels found for this category.
        </div>
      )}
    </main>
  );
}
