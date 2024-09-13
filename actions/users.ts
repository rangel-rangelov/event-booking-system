'use server';

import { type User } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/utils';
import { mapEvents, type MappedEvent } from './events';
import type { Role } from '@prisma/client';

export type PublicUser = Pick<User, 'id' | 'email' | 'createdAt' | 'role'>;

export const getAllUsers = async (): Promise<PublicUser[]> => {
  const session = await auth();

  if (session?.user.id && isAdmin(session.user.role as Role)) {
    const users = await prisma.user.findMany();

    return users.map(({ id, email, createdAt, role }) => ({
      id,
      email,
      createdAt,
      role,
    }));
  }

  return [];
};

export const getUserEvents = async (userId: number): Promise<MappedEvent[]> => {
  const session = await auth();

  if (session?.user.id && isAdmin(session.user.role as Role)) {
    const userDbEvents = await prisma.event.findMany({
      where: {
        authorId: userId,
      },
    });

    return mapEvents(userDbEvents);
  }

  return [];
};
