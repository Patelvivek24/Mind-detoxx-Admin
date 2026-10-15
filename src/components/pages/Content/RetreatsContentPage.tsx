import React from 'react';
import { PartyPopper } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { ContentEditor } from './components/ContentEditor';

export const RetreatsContentPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={PartyPopper}
        eyebrow="MIND DETOXX / CONTENT / RETREATS"
        title="Retreats page"
        description="Introduction to retreats and workshops"
      />
      <ContentEditor key="retreats" section="retreats" />
    </>
  );
};

export default RetreatsContentPage;
