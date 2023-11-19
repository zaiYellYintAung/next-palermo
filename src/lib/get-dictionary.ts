import 'server-only';
import type { Locale } from '@/i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  sv: () => import('@/locales/sv.json').then(module => module.default),
  en: () => import('@/locales/en.json').then(module => module.default),
};

/**
 * Retrieves the dictionary based on the specified locale.
 * If the locale is not found, it falls back to the Swedish dictionary.
 *
 * @param locale The locale for which to retrieve the dictionary.
 * @returns The dictionary object.
 */
export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.sv();
