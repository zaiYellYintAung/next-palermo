// export const i18n = {
//   defaultLocale: 'sv',
//   locales: ['sv', 'en'],
// } as const;

// export type Locale = (typeof i18n)['locales'][number];

const languages = [
  { id: 'en', title: 'English' },
  { id: 'sv', title: 'Svenska', isDefault: true },
];

const i18n = {
  languages,
  base: languages.find(item => item.isDefault)?.id,
};

export { i18n };
