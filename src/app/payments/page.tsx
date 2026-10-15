import { Metadata } from 'next';
import PaymentsPage from '@/components/pages/Payments/PaymentsPage';

export const metadata: Metadata = {
  title: 'Payments',
  description: 'View demonstration ledger of booking payments and transaction states.',
};

export default function Page() {
  return <PaymentsPage />;
}
