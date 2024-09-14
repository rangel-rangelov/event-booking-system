import { redirect } from 'next/navigation';

const Home = async (): Promise<void> => {
  redirect('/dashboard/events');
};

export default Home;
