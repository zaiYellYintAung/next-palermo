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
  const locales: string[] = i18n.languages.map(lang => lang.id);

  return matchLocale(languages, locales, i18n.base || 'id');
}

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

  if (pathname.startsWith(`/${i18n.base}/`) || pathname === `/${i18n.base}`) {
    const newUrl = new URL(
      pathname.replace(
        `/${i18n.base}`,
        pathname === `/${i18n.base}` ? '/' : ''
      ),
      request.url
    );

    newUrl.search = searchParams.toString();

    return NextResponse.redirect(newUrl, { status: 301 });
  }

  const pathnameIsMissingLocale = i18n.languages.every(
    locale =>
      !pathname.startsWith(`/${locale.id}/`) && pathname !== `/${locale.id}`
  );

  const locale = getLocale(request);

  if (pathnameIsMissingLocale) {
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

// https://denami.org/en/articles/web-development/internationalization-with-next-js-and-sanity-io
