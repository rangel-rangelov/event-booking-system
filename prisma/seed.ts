import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

const USERS_SEED_PATH = './prisma/users-seed.json';

async function main(): Promise<void> {
  const users = readJsonFile(USERS_SEED_PATH);

  users.forEach(async user => {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
      },
    });
  });

  // Color green
  // eslint-disable-next-line no-console
  console.log('\x1b[32m%s\x1b[0m', 'Database users seeded succesfully!');
}

function readJsonFile(filePath: string): User[] {
  try {
    const absolutePath = path.resolve(filePath);
    const data = fs.readFileSync(absolutePath, 'utf-8');
    const parsedData: User[] = JSON.parse(data);

    return parsedData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading JSON file', error);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    // eslint-disable-next-line no-console
    console.error('Error executing script', error);
    await prisma.$disconnect();
    process.exit(1);
  });
