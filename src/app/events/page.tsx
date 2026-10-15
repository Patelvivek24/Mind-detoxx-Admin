import { Metadata } from 'next';
import EventsPage from '@/components/pages/Events/EventsPage';

export const metadata: Metadata = {
  title: 'Events & Retreats',
  description: 'Manage upcoming wellness retreats, masterclasses and sound baths.',
};

export default function Page() {
  return <EventsPage />;
}
