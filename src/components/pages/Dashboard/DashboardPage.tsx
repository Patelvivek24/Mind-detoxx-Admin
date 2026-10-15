import React from 'react';
import { LayoutDashboard, Plus } from 'lucide-react';
import Link from 'next/link';
import { PageHeading } from '@/components/shared/PageHeading';
import { Button } from '@/components/ui/Button';
import { WelcomeBanner } from './components/WelcomeBanner';
import { DashboardMetrics } from './components/DashboardMetrics';
import { UpcomingAgenda } from './components/UpcomingAgenda';
import { AttentionList } from './components/AttentionList';
import { QuickPublishGrid } from './components/QuickPublishGrid';

export const DashboardPage: React.FC = () => {
  return (
    <>
      <PageHeading
        icon={LayoutDashboard}
        eyebrow="MIND DETOXX / DASHBOARD"
        title="Dashboard"
        description="Your studio at a glance"
        action={
          <Link href="/schedule">
            <Button icon={Plus}>Add a class</Button>
          </Link>
        }
      />

      <WelcomeBanner />
      <DashboardMetrics />

      <div className="dash-grid">
        <UpcomingAgenda />
        <AttentionList />
      </div>

      <QuickPublishGrid />
    </>
  );
};

export default DashboardPage;
