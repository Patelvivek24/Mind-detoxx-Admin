import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { MediaLibrary } from './components/MediaLibrary';

export const MediaPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={ImageIcon}
        eyebrow="MIND DETOXX / MEDIA"
        title="Media library"
        description="Upload images and video for public pages"
      />
      <MediaLibrary />
    </>
  );
};

export default MediaPage;
