import React from 'react';
import { Building2 } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { ContentEditor } from './components/ContentEditor';

export const RentalContentPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={Building2}
        eyebrow="MIND DETOXX / CONTENT / RENTAL"
        title="Rental page"
        description="Rental page copy and facilities"
      />
      <ContentEditor key="rental" section="rental" />
    </>
  );
};

export default RentalContentPage;
