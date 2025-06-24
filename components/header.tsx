"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            FreePublicTV
          </span>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white dark:bg-slate-900 md:static md:flex md:items-center md:space-x-6 md:w-auto`}
        >
          <Link
            href="/"
            className="block px-4 py-2 md:p-0 text-slate-700 dark:text-slate-200 hover:text-blue-500"
          >
            Home
          </Link>
          <Link
            href="/channels"
            className="block px-4 py-2 md:p-0 text-slate-700 dark:text-slate-200 hover:text-blue-500"
          >
            Channels
          </Link>
          <Link
            href="/country"
            className="block px-4 py-2 md:p-0 text-slate-700 dark:text-slate-200 hover:text-blue-500"
          >
            Countries
          </Link>
          <Link
            href="/category"
            className="block px-4 py-2 md:p-0 text-slate-700 dark:text-slate-200 hover:text-blue-500"
          >
            Category
          </Link>
        </nav>
      </div>
    </header>
  );
}
