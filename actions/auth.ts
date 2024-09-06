'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from 'bcryptjs';

import { prisma } from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/lib/zod";
import { Role } from "@prisma/client";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
  } catch (error) {
    if(error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    return { error: '500' }
  }
}

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    
    if(!success) {
      return { error: 'Invalid data!' };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if(user) {
      return { error: 'E-mail is already in user. Try to login instead!'}
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        email: data.email,
        password: passwordHash,
        role: Role.USER,
      }
    });

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };

  } catch (error) {
    if(error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }

    return { error: '500' }
  }
}