import { Metadata } from 'next';
import RentalContentPage from '@/components/pages/Content/RentalContentPage';

export const metadata: Metadata = {
  title: 'Rental Page Content Editor',
  description: 'Manage studio hall rental copy, terms and listed amenities.',
};

export default function Page() {
  return <RentalContentPage />;
}
