import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './lib/prisma';
import { loginSchema } from './lib/zod';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error('Invalid credentials!');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials!');
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error('Invalid credentials!');
        }

        return {
          email: user.email,
          id: user.id,
          role: user.role,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any; // Тhis is a temporary hotfix related to this issue - https://github.com/nextauthjs/next-auth/issues/2701
      },
    }),
  ],
} satisfies NextAuthConfig;
