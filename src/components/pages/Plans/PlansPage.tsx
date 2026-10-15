import React from 'react';
import { UsersRound } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { PlansList } from './components/PlansList';

export const PlansPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={UsersRound}
        eyebrow="MIND DETOXX / PLANS"
        title="Plans & memberships"
        description="Manage drop-in and subscription offerings"
      />
      <PlansList />
    </>
  );
};

export default PlansPage;
