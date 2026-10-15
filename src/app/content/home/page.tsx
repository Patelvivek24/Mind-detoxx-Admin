import { Metadata } from 'next';
import HomeContentPage from '@/components/pages/Content/HomeContentPage';

export const metadata: Metadata = {
  title: 'Home Page Content Editor',
  description: 'Manage homepage hero copy, intro text and featured activity tags.',
};

export default function Page() {
  return <HomeContentPage />;
}
