"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Category } from "@/types";

export default function CategoryArchivePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        // Filter out the 'xxx' category
        const safeCategories = data.filter(
          (category: Category) => category.id.toLowerCase() !== "xxx"
        );

        setCategories(safeCategories);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400">
        Loading categories...
      </div>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10  text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
        Browse by Category
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id.toLowerCase()}`}
            className="bg-slate-800 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center justify-center text-center border border-slate-700 hover:border-blue-600"
          >
            <h2 className="text-lg font-semibold capitalize hover:text-blue-400 transition">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
