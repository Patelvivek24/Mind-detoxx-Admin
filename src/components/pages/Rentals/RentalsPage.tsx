import React from 'react';
import { Building2 } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { RentalsList } from './components/RentalsList';

export const RentalsPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={Building2}
        eyebrow="MIND DETOXX / RENTALS"
        title="Studio rentals"
        description="Availability and studio rental enquiries"
      />
      <RentalsList />
    </>
  );
};

export default RentalsPage;
