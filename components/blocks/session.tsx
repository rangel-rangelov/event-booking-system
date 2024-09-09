'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import type { Session } from 'next-auth';

interface Props {
  session: Session;
}

export const SessionSection = ({ session }: Props): JSX.Element => {
  return (
    <>
      <div>{JSON.stringify(session, null, 2)}</div>
      <Button onClick={() => signOut()}>Log-out</Button>
    </>
  );
};
