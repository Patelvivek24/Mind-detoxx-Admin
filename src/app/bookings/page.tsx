import { Metadata } from 'next';
import BookingsPage from '@/components/pages/Bookings/BookingsPage';

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'Track customer bookings, payments and attendance records.',
};

export default function Page() {
  return <BookingsPage />;
}
