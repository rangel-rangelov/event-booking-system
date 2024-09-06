import { LoginForm } from "@/components/blocks/login";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
}
