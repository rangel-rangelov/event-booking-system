import type { User } from '@prisma/client';
import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      email: User['email'];
      id: User['id'];
      role: User['role'];
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    idToken?: string;
    id: User['id'] | null;
    role: User['role'] | null;
  }
}
