import React from 'react';
import { MessageCircle } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { EnquiriesTable } from './components/EnquiriesTable';

export const EnquiriesPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={MessageCircle}
        eyebrow="MIND DETOXX / ENQUIRIES"
        title="Enquiries"
        description="All incoming requests in one place"
      />
      <EnquiriesTable />
    </>
  );
};

export default EnquiriesPage;
