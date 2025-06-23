import { getCountryBySlug } from "@/lib/countryUtils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) return notFound();

  return {
    title: `Watch ${country.name} TV Channels - FreePublicTV`,
    description: `Watch public TV channels from ${country.name}. Browse live and HD streams for free.`,
    openGraph: {
      title: `${country.name} TV Channels - FreePublicTV`,
      description: `Watch public TV channels from ${country.name}.`,
      images: [country.flagUrl],
    },
  };
}

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
