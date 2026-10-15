'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export const UpcomingAgenda: React.FC = () => {
  const { db, openModal } = useStudio();

  const upcoming = db.sessions
    .filter((x) => x.date >= '2026-09-29')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 5);

  return (
    <section className="card dashboard-panel">
      <div className="panel-head">
        <div>
          <h2>Coming up</h2>
          <p>Next classes on the calendar</p>
        </div>
        <Link href="/schedule" className="text-button">
          View calendar <ArrowUpRight size={15} />
        </Link>
      </div>

      {upcoming.length > 0 ? (
        upcoming.map((x) => {
          const dayNumber = x.date.slice(8);
          const monthShort = new Date(x.date + 'T12:00:00').toLocaleDateString('en-IN', {
            month: 'short',
          });
          return (
            <div className="agenda-row" key={x.id}>
              <div className="date-box">
                <b>{dayNumber}</b>
                <small>{monthShort}</small>
              </div>
              <div>
                <b>{x.activity}</b>
                <small>
                  {x.time} · {x.duration} min · {x.instructor || 'Instructor to confirm'}
                </small>
              </div>
              <span className="seat-pill">{x.capacity} seats</span>
            </div>
          );
        })
      ) : (
        <EmptyState
          title="Your calendar is ready"
          text="Create a class or repeat a weekly schedule to fill this space."
          action={
            <Button icon={Plus} onClick={() => openModal('session')}>
              Add class
            </Button>
          }
        />
      )}
    </section>
  );
};

export default UpcomingAgenda;
