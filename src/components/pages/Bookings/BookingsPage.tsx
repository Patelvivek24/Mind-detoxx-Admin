import React from 'react';
import { BookOpen } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { BookingsTable } from './components/BookingsTable';

export const BookingsPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={BookOpen}
        eyebrow="MIND DETOXX / BOOKINGS"
        title="Bookings"
        description="Class, membership, event and rental requests"
      />
      <BookingsTable />
    </>
  );
};

export default BookingsPage;
