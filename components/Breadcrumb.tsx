"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import countries from "world-countries";
import slugify from "slugify";
import { Channel } from "@/types";

// Convert country code to full country name
function getCountryName(code: string) {
  const normalizedCode =
    code.toUpperCase() === "UK" ? "GB" : code.toUpperCase();
  return (
    countries.find((c) => c.cca2 === normalizedCode)?.name.common ||
    code.toUpperCase()
  );
}

export default function Breadcrumb({ channel }: { channel: Channel }) {
  const countryName = getCountryName(channel.country);
  const countrySlug = slugify(countryName, { lower: true, strict: true });

  const category = channel.categories?.[0];
  const categorySlug = category
    ? slugify(category, { lower: true, strict: true })
    : "";

  return (
    <nav
      className="max-w-screen-xl mx-auto px-4 pt-4 pb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap text-sm text-slate-400 space-x-1">
        <li>
          <Link href="/" className="hover:text-blue-400 font-medium">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </li>

        <li>
          <Link href="/channels" className="hover:text-blue-400 font-medium">
            Channels
          </Link>
        </li>

        {countryName && (
          <>
            <li>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </li>
            <li>
              <Link
                href={`/country/${countrySlug}`}
                className="hover:text-blue-400 font-medium"
              >
                {countryName}
              </Link>
            </li>
          </>
        )}

        {category && (
          <>
            <li>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </li>
            <li>
              <Link
                href={`/category/${categorySlug}`}
                className="hover:text-blue-400 font-medium capitalize"
              >
                {category}
              </Link>
            </li>
          </>
        )}

        <li>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </li>
        <li className="text-white font-semibold truncate max-w-[180px] sm:max-w-none">
          {channel.name}
        </li>
      </ol>
    </nav>
  );
}
