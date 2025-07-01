"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Category } from "@/types";

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLAnchorElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
        setTimeout(checkScroll, 100);
      });
  }, []);

  const scroll = (dir: "left" | "right") => {
    const container = scrollRef.current;
    const item = itemRef.current;
    if (!container || !item) return;

    const gap = 16;
    const itemWidth = item.offsetWidth + gap;
    container.scrollBy({
      left: dir === "left" ? -itemWidth : itemWidth,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => checkScroll());
    observer.observe(el);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  return (
    <section className="max-w-screen-xl mx-auto w-full px-4 py-10 ">
      <div className="flex justify-between items-center mb-4 px-2 sm:px-4 md:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white">
          Channel Categories
        </h2>
        <Link
          href="/category"
          className="text-sm text-blue-400 hover:underline whitespace-nowrap"
        >
          See more →
        </Link>
      </div>

      <div className="relative">
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-700 shadow p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white border border-slate-700 shadow p-2 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 sm:px-4"
        >
          {categories.map((category, idx) => (
            <Link
              key={category.id}
              ref={idx === 0 ? itemRef : null}
              href={`/category/${category.name}`}
              className="flex-shrink-0 w-40 sm:w-52 md:w-60 h-28 sm:h-32 rounded-xl bg-gradient-to-br from-blue-700/40 to-slate-800/40 border border-white/10 backdrop-blur-md text-white font-semibold text-center text-base sm:text-xl shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-300 flex items-center justify-center bg-slate-900"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
