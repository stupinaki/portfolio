// пример: https://github.com/i18next/next-app-dir-i18next-example-ts/blob/main/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import acceptLanguage from 'accept-language';

import { COOKIES_KEY } from '@/constants/constants';
import { fallbackLng, languages } from '@/interfaces/dictionary';

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|robots.txt|sitemap.xml|sitemap-0.xml|favicon.ico).*)',
  ],
};

function resolveLng(req: NextRequest): string {
  const pathResolver = () => {
    const path = req.nextUrl.pathname.split('/')[1];
    return languages.find((language) => language === path);
  };

  const cookieResolver = () => {
    const cookieValue = req.cookies.get(COOKIES_KEY)?.value;
    return languages.find((language) => language === cookieValue);
  };

  const headerResolver = () => acceptLanguage.get(req.headers.get('Accept-Language'));

  return pathResolver() || cookieResolver() || headerResolver() || fallbackLng;
}

function buildResponse(req: NextRequest, lng: string) {
  const isRedirect =
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next');

  if (isRedirect) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  return NextResponse.next();
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.indexOf('icon') > -1 || pathname.indexOf('chrome') > -1) {
    return NextResponse.next();
  }
  const lng = resolveLng(req);

  const response = buildResponse(req, lng);
  response.cookies.set(COOKIES_KEY, lng);

  return response;
}
