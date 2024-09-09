import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth: middleware } = NextAuth(authConfig);

const PUBLIC_ROUTES = ['/auth/login', '/auth/register'];
const ADMIN_ROUTES = ['/studio'];

export default middleware(req => {
  const { nextUrl, auth } = req;

  const isLoggedIn = !!auth?.user;
  const isAdmin = auth?.user.role === Role.ADMIN;

  if (!PUBLIC_ROUTES.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  if (ADMIN_ROUTES.includes(nextUrl.pathname) && !isAdmin) {
    return NextResponse.redirect(new URL('/404', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
