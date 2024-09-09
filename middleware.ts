import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth: middleware } = NextAuth(authConfig);

const PUBLIC_ROUTES = ['/auth/login', '/auth/register'];

export default middleware(req => {
  const { nextUrl, auth } = req;

  const isLoggedIn = !!auth?.user;

  if (!PUBLIC_ROUTES.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
