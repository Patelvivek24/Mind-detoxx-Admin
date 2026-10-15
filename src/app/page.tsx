import { Metadata } from 'next';
import DashboardPage from '@/components/pages/Dashboard/DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your studio at a glance — manage classes, bookings and enquiries.',
};

export default function Page() {
  return <DashboardPage />;
}
