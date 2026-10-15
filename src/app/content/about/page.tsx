import { Metadata } from 'next';
import AboutContentPage from '@/components/pages/Content/AboutContentPage';

export const metadata: Metadata = {
  title: 'About Us Content Editor',
  description: 'Manage studio story, values, team profiles and address details.',
};

export default function Page() {
  return <AboutContentPage />;
}
