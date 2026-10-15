import React from 'react';
import { Sparkles } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { ActivitiesTable } from './components/ActivitiesTable';

export const ActivitiesPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={Sparkles}
        eyebrow="MIND DETOXX / ACTIVITIES"
        title="Activities catalogue"
        description="The public catalogue of studio practices"
      />
      <ActivitiesTable />
    </>
  );
};

export default ActivitiesPage;
