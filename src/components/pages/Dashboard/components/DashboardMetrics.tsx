'use client';

import React from 'react';
import { BookOpen, Sparkles, CalendarDays, MessageCircle } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { MiniMetric } from '@/components/ui/MiniMetric';

export const DashboardMetrics: React.FC = () => {
  const { db } = useStudio();

  const totalBookings = db.bookings.length;
  const activeActivities = db.activities.filter((x) => x.status === 'Published').length;
  const upcomingSessions = db.sessions.filter((x) => x.date >= '2026-09-29').length;
  const openEnquiries = db.enquiries.filter((x) => x.status !== 'Resolved').length;

  return (
    <div className="metrics-row four">
      <MiniMetric label="Total bookings" value={totalBookings} icon={BookOpen} />
      <MiniMetric label="Active activities" value={activeActivities} icon={Sparkles} />
      <MiniMetric label="Upcoming sessions" value={upcomingSessions} icon={CalendarDays} />
      <MiniMetric label="Open enquiries" value={openEnquiries} icon={MessageCircle} />
    </div>
  );
};

export default DashboardMetrics;
