import { Metadata } from 'next';
import PlansPage from '@/components/pages/Plans/PlansPage';

export const metadata: Metadata = {
  title: 'Plans & Memberships',
  description: 'Manage drop-in classes, monthly passes and group wellness packages.',
};

export default function Page() {
  return <PlansPage />;
}
