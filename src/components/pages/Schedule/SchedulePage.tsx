import React from 'react';
import { CalendarDays } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { CalendarGrid } from './components/CalendarGrid';

export const SchedulePage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={CalendarDays}
        eyebrow="MIND DETOXX / SCHEDULE"
        title="Class calendar"
        description="Build recurring weeks and manage individual dates"
      />
      <CalendarGrid />
    </>
  );
};

export default SchedulePage;
