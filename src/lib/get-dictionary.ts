import 'server-only';
import type { Locale } from '@/i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  sv: () => import('@/locales/sv.json').then(module => module.default),
  en: () => import('@/locales/en.json').then(module => module.default),
};

/**
 * Retrieves a dictionary based on the specified locale.
 * If the specified locale is not found, the Swedish dictionary is returned.
 * @param locale - The locale to retrieve the dictionary for.
 * @returns The dictionary for the specified locale, or the Swedish dictionary if the specified locale is not found.
 */
export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
