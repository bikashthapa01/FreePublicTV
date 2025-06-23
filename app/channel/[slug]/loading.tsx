export default function ChannelPageLoading() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-20 px-4 animate-pulse">
      <section className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        {/* Left: Player + Info */}
        <div>
          <div className="relative w-full pt-[56.25%] bg-slate-800 rounded-lg overflow-hidden shadow-lg" />

          <div className="mt-6 space-y-6">
            <div className="flex flex-row items-start gap-4">
              <div className="w-20 h-20 bg-slate-700 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-slate-700 rounded w-1/2" />
              </div>
            </div>
            <div className="w-full h-20 bg-slate-800 rounded" />
          </div>
        </div>

        {/* Right: Related Channels */}
        <aside className="space-y-4">
          <div className="h-6 bg-slate-700 rounded w-3/4" />
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-slate-800 rounded" />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
