import { Metadata } from 'next';
import EnquiriesPage from '@/components/pages/Enquiries/EnquiriesPage';

export const metadata: Metadata = {
  title: 'Enquiries',
  description: 'Manage prospect leads, workshop questions and rental queries.',
};

export default function Page() {
  return <EnquiriesPage />;
}
