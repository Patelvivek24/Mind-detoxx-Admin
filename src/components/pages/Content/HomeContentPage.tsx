import React from 'react';
import { House } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { ContentEditor } from './components/ContentEditor';

export const HomeContentPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={House}
        eyebrow="MIND DETOXX / CONTENT / HOME"
        title="Home page"
        description="Edit the content visitors see on the home page"
      />
      <ContentEditor key="home" section="home" />
    </>
  );
};

export default HomeContentPage;
