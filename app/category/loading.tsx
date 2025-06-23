export default function LoadingCountryPage() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-4 w-40 bg-slate-300 dark:bg-slate-700 rounded mb-4" />
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-6 w-48 bg-slate-300 dark:bg-slate-600 rounded" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-40 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
        ))}
      </div>
    </main>
  );
}
