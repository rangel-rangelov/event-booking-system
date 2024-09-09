import { LoginForm } from '@/components/organisms/login';

const Login = (): JSX.Element => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
};

export default Login;
