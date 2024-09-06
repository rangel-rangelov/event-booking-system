"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  session: Session;
};

export const SessionSection = ({ session }: Props): JSX.Element => {
  return (
    <>
      <div>{JSON.stringify(session, null, 2)}</div>
      <Button onClick={() => signOut()}>Log-out</Button>
    </>
  );
};
