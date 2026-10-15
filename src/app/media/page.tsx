import { Metadata } from 'next';
import MediaPage from '@/components/pages/Media/MediaPage';

export const metadata: Metadata = {
  title: 'Media Library',
  description: 'Upload and manage photography, background videos and brand assets.',
};

export default function Page() {
  return <MediaPage />;
}
