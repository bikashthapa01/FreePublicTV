// components/SectionWithGrid.tsx
"use client";

import Link from "next/link";
import React from "react";

type SectionWithGridProps = {
  title: string;
  seeMoreLink?: string;
  items: React.ReactNode[];
  columns?: string; // Tailwind grid classes
};

export default function SectionWithGrid({
  title,
  seeMoreLink,
  items,
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
}: SectionWithGridProps) {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 transition-colors duration-500 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {title}
          </h2>
          {seeMoreLink && (
            <Link
              href={seeMoreLink}
              className="text-sm sm:text-base text-blue-600 hover:underline whitespace-nowrap"
            >
              See more →
            </Link>
          )}
        </div>

        <div className={`grid ${columns} gap-4 sm:gap-6`}>
          {items.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
