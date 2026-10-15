'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy,
  Info,
} from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { Button } from '@/components/ui/Button';
import { dateLabel, iso, REFERENCE_NOW, weekdays } from '@/lib/utils/formatters';

export const CalendarGrid: React.FC = () => {
  const { db, openModal } = useStudio();
  const [date, setDate] = useState<Date>(REFERENCE_NOW);
  const [view, setView] = useState<'week' | 'month'>('week');
  const [activityFilter, setActivityFilter] = useState('All activities');

  // Compute 7 days for week view
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  const days: Date[] =
    view === 'week'
      ? Array.from({ length: 7 }, (_, i) => {
          const x = new Date(monday);
          x.setDate(monday.getDate() + i);
          return x;
        })
      : (() => {
          const start = new Date(date.getFullYear(), date.getMonth(), 1);
          start.setDate(start.getDate() - start.getDay());
          return Array.from({ length: 42 }, (_, i) => {
            const x = new Date(start);
            x.setDate(start.getDate() + i);
            return x;
          });
        })();

  const filteredSessions = db.sessions.filter(
    (x) => activityFilter === 'All activities' || x.activity === activityFilter
  );

  const shift = (n: number) => {
    const x = new Date(date);
    if (view === 'week') {
      x.setDate(x.getDate() + 7 * n);
    } else {
      x.setMonth(x.getMonth() + n);
    }
    setDate(x);
  };

  const rangeTitle =
    view === 'week'
      ? `${dateLabel(iso(days[0]))} – ${dateLabel(iso(days[6]))}`
      : date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  return (
    <>
      <div className="calendar-tools">
        <div className="calendar-title">
          <h2>{rangeTitle}</h2>
          <div className="calendar-nav">
            <button onClick={() => shift(-1)} aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setDate(REFERENCE_NOW)}>Today</button>
            <button onClick={() => shift(1)} aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="calendar-actions">
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
          >
            <option>All activities</option>
            {db.activities.map((x) => (
              <option key={x.id} value={x.name}>
                {x.name}
              </option>
            ))}
          </select>

          <div className="segmented">
            <button
              className={view === 'week' ? 'active' : ''}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button
              className={view === 'month' ? 'active' : ''}
              onClick={() => setView('month')}
            >
              Month
            </button>
          </div>

          <Button
            variant="secondary"
            icon={Copy}
            onClick={() => openModal('recurring')}
          >
            Repeat weekly
          </Button>
          <Button icon={Plus} onClick={() => openModal('session')}>
            Add class
          </Button>
        </div>
      </div>

      <div className="card calendar">
        <div className={`calendar-grid ${view}`}>
          {days.map((d, i) => {
            const dayStr = iso(d);
            const isCurrentToday = dayStr === iso(REFERENCE_NOW);
            const isOutsideMonth = view === 'month' && d.getMonth() !== date.getMonth();
            const dayItems = filteredSessions
              .filter((x) => x.date === dayStr)
              .sort((a, b) => a.time.localeCompare(b.time));

            return (
              <div
                key={i}
                className={`day ${isCurrentToday ? 'today' : ''} ${
                  isOutsideMonth ? 'outside' : ''
                }`}
              >
                <div className="day-label">
                  <span>{weekdays[d.getDay()]}</span>
                  <b>{d.getDate()}</b>
                </div>

                <div className="day-content">
                  {dayItems.map((s) => {
                    const bookedCount = db.bookings.filter(
                      (b) => b.sessionId === s.id && b.status === 'Confirmed'
                    ).length;

                    return (
                      <button
                        type="button"
                        className="class-chip"
                        key={s.id}
                        onClick={() => openModal('session', s)}
                      >
                        <span>{s.time}</span>
                        <b>{s.activity}</b>
                        <small>
                          {bookedCount}/{s.capacity} booked · {s.status}
                        </small>
                      </button>
                    );
                  })}

                  {dayItems.length === 0 && view === 'week' && (
                    <span className="no-class">No classes</span>
                  )}

                  <button
                    type="button"
                    className="add-slot"
                    title={`Add class on ${dayStr}`}
                    onClick={() => openModal('session', { date: dayStr })}
                  >
                    <Plus size={15} />
                    <span>Add class</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="notice">
        <Info size={18} />
        <span>
          Schedule data is sample content. Save recurring classes to generate dated sessions for
          the next four weeks; the live system will generate future sessions automatically.
        </span>
      </div>
    </>
  );
};

export default CalendarGrid;
