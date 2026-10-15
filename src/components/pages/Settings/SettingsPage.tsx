import React from 'react';
import { Settings2 } from 'lucide-react';
import { PageHeading } from '@/components/shared/PageHeading';
import { SettingsForm } from './components/SettingsForm';

export const SettingsPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={Settings2}
        eyebrow="MIND DETOXX / SETTINGS"
        title="Settings"
        description="Contact details, publishing and access"
      />
      <SettingsForm />
    </>
  );
};

export default SettingsPage;
