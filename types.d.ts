import type { AdapterUser } from '@prisma/client';
import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      role?: string;
    };
  }

  interface User extends AdapterUser {
    id: string;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role?: string;
  }
}
