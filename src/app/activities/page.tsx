import { Metadata } from 'next';
import ActivitiesPage from '@/components/pages/Activities/ActivitiesPage';

export const metadata: Metadata = {
  title: 'Activities Catalogue',
  description: 'Manage yoga practices, sound healing, meditations and specialized workshops.',
};

export default function Page() {
  return <ActivitiesPage />;
}
