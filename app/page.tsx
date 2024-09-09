import { auth } from '@/auth';
import { SessionSection } from '@/components/blocks/session';

const Home = async (): Promise<JSX.Element> => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SessionSection session={session} />
    </main>
  );
};

export default Home;
