import { Metadata } from 'next';
import RentalsPage from '@/components/pages/Rentals/RentalsPage';

export const metadata: Metadata = {
  title: 'Studio Rentals',
  description: 'Manage hall rental requests, equipment bookings and studio time slots.',
};

export default function Page() {
  return <RentalsPage />;
}
