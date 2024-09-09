import { RegisterForm } from '@/components/organisms/register';

const Register = (): JSX.Element => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RegisterForm />
    </main>
  );
};

export default Register;
