// app/loading.tsx
export default function LoadingHomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-slate-900 px-4 py-6 gap-10">
      {/* Hero loading */}
      <section className="h-48 sm:h-64 md:h-72 w-full bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />

      {/* Grid loading */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-36 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"
          />
        ))}
      </section>
    </main>
  );
}
