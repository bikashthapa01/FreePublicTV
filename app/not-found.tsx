// app/not-found.tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-slate-900 text-center">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
        moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        <ArrowLeft size={18} />
        Go Back Home
      </Link>
    </main>
  );
}
