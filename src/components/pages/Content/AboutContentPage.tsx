import React from 'react';
import { Info } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { ContentEditor } from './components/ContentEditor';

export const AboutContentPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={Info}
        eyebrow="MIND DETOXX / CONTENT / ABOUT"
        title="About us"
        description="Studio story, team and location"
      />
      <ContentEditor key="about" section="about" />
    </>
  );
};

export default AboutContentPage;
