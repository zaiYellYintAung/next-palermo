import { NextResponse, NextRequest } from 'next/server';
import { i18n } from '@/i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  console.log('locales:', locales);

  return matchLocale(languages, locales, i18n.defaultLocale);
}

// export function middleware(request: NextRequest) {
//   const preferredLocale = getLocale(request);
//   console.log('preferredLocale:', preferredLocale);
// }
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  console.log('pathname', pathname);

  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/next.svg',
      '/vercel.svg',
      '/thirteen.svg',
      '/sitemap.xml',
      '/sitemap-0.xml',
      '/sitemap-*.xml',
      '/images/*.jpg',
      '/*.jpg',
      '/*.svg',
      '/*.png',
      '/og.jpg',
    ].includes(pathname)
  )
    return;

  //

  if (
    pathname.startsWith(`/${i18n.defaultLocale}/`) ||
    pathname === `/${i18n.defaultLocale}`
  ) {
    const newUrl = new URL(
      pathname.replace(
        `/${i18n.defaultLocale}`,
        pathname === `/${i18n.defaultLocale}` ? '/' : ''
      ),
      request.url
    );

    newUrl.search = searchParams.toString();

    return NextResponse.redirect(newUrl, { status: 301 });
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    console.log('pathnameIsMissingLocale:', pathnameIsMissingLocale);

    const newUrl = new URL(`/${i18n.defaultLocale}${pathname}`, request.url);

    newUrl.search = searchParams.toString();

    return NextResponse.rewrite(newUrl);
  }

  const locale = getLocale(request);

  if (typeof locale === 'string' && locale) {
    console.log('locale:', locale);

    const newUrl = new URL(`/${locale}`, request.url);

    newUrl.search = searchParams.toString();

    return NextResponse.rewrite(newUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

// https://localizely.com/blog/nextjs-i18n-tutorial/?tab=app-router

// https://carlogino.com/blog/nextjs13-i18n

// https://www.adamrichardson.dev/blog/localisation-i18n-nextjs-appdir-13
