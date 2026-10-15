import { Metadata } from 'next';
import SettingsPage from '@/components/pages/Settings/SettingsPage';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage studio profile, payment gateways, permissions and audit trail.',
};

export default function Page() {
  return <SettingsPage />;
}
