"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getAllCountries } from "@/lib/countryUtils";
import FallbackImage from "@/components/FallbackImage";

const ITEMS_PER_PAGE = 24;

export default function CountryArchive() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const [query, setQuery] = useState("");

  const allCountries = useMemo(() => {
    return getAllCountries().sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    return allCountries.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allCountries]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1); // reset to first page on search
    router.push(`/country?page=1`);
  };

  const goToPage = (p: number) => {
    setPage(p);
    router.push(`/country?page=${p}`);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-10 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-4">
            Explore Channels by Country
          </h1>
          <input
            type="text"
            placeholder="Search country..."
            className="w-full max-w-md mx-auto px-4 py-2 border rounded-md shadow-sm border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {paginated.map((country) => (
            <Link
              key={country.code}
              href={`/country/${country.slug}`}
              className="group bg-white/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-blue-600 transition-all p-4 flex flex-col items-center text-center"
            >
              <FallbackImage
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-12 h-8 object-cover rounded shadow mb-3 border"
              />
              <span className="text-sm font-medium text-slate-800 dark:text-white group-hover:text-blue-600 transition">
                {country.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
            {page > 1 && (
              <button
                onClick={() => goToPage(page - 1)}
                className="px-4 py-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-slate-700 transition"
              >
                ← Previous
              </button>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${
                  i + 1 === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {page < totalPages && (
              <button
                onClick={() => goToPage(page + 1)}
                className="px-4 py-2 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-slate-700 transition"
              >
                Next →
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
