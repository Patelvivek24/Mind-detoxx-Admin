import { Metadata } from 'next';
import RetreatsContentPage from '@/components/pages/Content/RetreatsContentPage';

export const metadata: Metadata = {
  title: 'Retreats Page Content Editor',
  description: 'Manage retreats overview, headlines and promotional media.',
};

export default function Page() {
  return <RetreatsContentPage />;
}
