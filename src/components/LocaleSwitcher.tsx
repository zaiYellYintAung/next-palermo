'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/i18n-config';

export default function LocaleSwitcher() {
  // const pathName = usePathname();
  // // console.log('pathName', pathName);
  // const currentLocale = pathName.split('/')[1] || i18n.defaultLocale;
  // // console.log('[LocaleSwitcher] currentLocale:', currentLocale);
  // const redirectedPathName = (locale: string) => {
  //   if (locale === i18n.defaultLocale) {
  //     return '/';
  //   }
  //   if (!pathName) return `/${locale}`;
  //   const segments = pathName.split('/');
  //   segments[1] = locale;
  //   return segments.join('/');
  // };
  // return (
  //   <div>
  //     <p>Locale switcher:</p>
  //     <ul>
  //       {i18n.locales.map(locale => {
  //         const isCurrentLocale = locale === currentLocale;
  //         // console.log('Is current locale:', isCurrentLocale);
  //         return (
  //           <li key={locale}>
  //             {isCurrentLocale ? (
  //               <span className='text-gray-500'>{locale}</span>
  //             ) : (
  //               <Link href={redirectedPathName(locale)}>{locale}</Link>
  //             )}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
}
