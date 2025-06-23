import CategorySlider from "@/components/categorySlider";
import ChannelCard from "@/components/channelCard";
import Hero from "@/components/hero";
import SectionWithGrid from "@/components/sectionWithGrid";

import { Channel } from "@/types";

export default async function Home() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/channels?page=1&limit=20`,
    {
      cache: "no-store",
    }
  );

  const { data: topChannels = [] } = await res.json();

  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-slate-900 ">
      <Hero channels={topChannels} />

      {/* Category Slider Section */}
      <section className="w-full bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500 py-10">
        <CategorySlider />
      </section>

      {/* Featured Channels Grid */}
      <SectionWithGrid
        title="Featured Channels"
        seeMoreLink="/channels"
        items={topChannels.map((channel: Channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      />
    </main>
  );
}
