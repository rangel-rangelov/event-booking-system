'use server';

import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/zod';
import type { loginSchema } from '@/lib/zod';
import type { z } from 'zod';

export const loginAction = async (
  values: z.infer<typeof loginSchema>,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    return { error: "We couldn't log you at this time, please try later" };
  }
};

export const registerAction = async (
  values: z.infer<typeof registerSchema>,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return { error: 'Invalid data!' };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return { error: 'E-mail is already in user. Try to login instead!' };
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        email: data.email,
        password: passwordHash,
        role: Role.USER,
      },
    });

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    return { error: '500' };
  }
};
