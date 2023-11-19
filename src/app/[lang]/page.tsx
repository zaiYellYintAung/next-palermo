import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // console.log('[page component] lang:', lang);

  const dictionary = await getDictionary(lang);
  return (
    <>
      <h2>{dictionary.home.title}</h2>
      <LocaleSwitcher />
    </>
  );
}
