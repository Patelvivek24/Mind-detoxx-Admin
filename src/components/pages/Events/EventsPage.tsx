import React from 'react';
import { PartyPopper } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { EventsGrid } from './components/EventsGrid';

export const EventsPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={PartyPopper}
        eyebrow="MIND DETOXX / EVENTS"
        title="Events & retreats"
        description="Publish events and manage ticket capacity"
      />
      <EventsGrid />
    </>
  );
};

export default EventsPage;
