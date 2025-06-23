import countries from "world-countries";
import slugify from "slugify";
import { CountryData } from "@/types";

/**
 * Returns a list of countries with name, code, slug, and flag URL
 */
export const getAllCountries = () => {
  return countries.map((c) => {
    const code = c.cca2.toLowerCase(); // 2-letter ISO code (e.g., 'us', 'fr')
    return {
      name: c.name.common,
      code,
      slug: slugify(c.name.common, { lower: true }),
      flag: `https://flagcdn.com/w80/${code}.png`,
    };
  });
};

/**
 * Gets the 2-letter country code from a slug.
 */
export function getCountryCodeBySlug(slug: string): string | null {
  const match = countries.find(
    (c) => slugify(c.name.common, { lower: true }) === slug
  );
  return match?.cca2 || null;
}

/**
 * Gets full country data by slug.
 */
export function getCountryBySlug(slug: string): CountryData | null {
  const match = countries.find(
    (c) => slugify(c.name.common, { lower: true }) === slug
  );
  if (!match) return null;

  const name = match.name.common;
  const code = match.cca2;
  const flagUrl = `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  return { name, code, slug, flagUrl };
}
