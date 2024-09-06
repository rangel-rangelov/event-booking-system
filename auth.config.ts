import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';

import { loginSchema } from "./lib/zod";
import { prisma } from "./lib/prisma";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if(!success) {
          throw new Error("Invalid credentials!")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email
          }
        })

        console.log(user);

        if(!user || !user.password) {
          throw new Error("Invalid credentials!")
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if(!isValid) {
          throw new Error("Invalid credentials!")
        }

        return { 
          email: user.email,
          id: user.id,
          role: user.role,
        } as any; // Тhis is a temporary hotfix related to this issue - https://github.com/nextauthjs/next-auth/issues/2701
      },
      
    })
  ],
} satisfies NextAuthConfig;

// TODO 
function saltAndHashPassword(password: unknown) {
  return true;
}
function getUserFromDb(email: unknown, pwHash: boolean): any {
  return { 
    user: 'andy',
    email: 'andyGarcia@mail.com',
  }
}

