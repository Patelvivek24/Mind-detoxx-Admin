import { Metadata } from 'next';
import SchedulePage from '@/components/pages/Schedule/SchedulePage';

export const metadata: Metadata = {
  title: 'Class Calendar',
  description: 'Manage recurring timetables, dated sessions and instructor assignments.',
};

export default function Page() {
  return <SchedulePage />;
}
