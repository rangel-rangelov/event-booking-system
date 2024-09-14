import { redirect } from 'next/navigation';

const DashboardHome = async (): Promise<void> => {
  redirect('/dashboard/events');
};

export default DashboardHome;
