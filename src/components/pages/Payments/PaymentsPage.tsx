import React from 'react';
import { WalletCards } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { PaymentsLedger } from './components/PaymentsLedger';

export const PaymentsPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={WalletCards}
        eyebrow="MIND DETOXX / PAYMENTS"
        title="Payments"
        description="A demonstration ledger of payment status"
      />
      <PaymentsLedger />
    </>
  );
};

export default PaymentsPage;
