'use client';

import React from 'react';
import { PartyPopper, Plus, Building2, UsersRound } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { dateLabel, fmt } from '@/lib/utils/formatters';

export const EventsGrid: React.FC = () => {
  const { db, openModal } = useStudio();

  return (
    <>
      <div className="section-head">
        <div>
          <h2>Events and retreats</h2>
          <p>Draft an event, confirm its details, then publish it.</p>
        </div>
        <Button icon={Plus} onClick={() => openModal('event')}>
          Create event
        </Button>
      </div>

      <div className="event-grid">
        {db.events.map((x) => (
          <div className="card event-card" key={x.id}>
            <div className="event-art">
              {x.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={x.image} alt={x.title} />
              ) : (
                <PartyPopper size={35} />
              )}
            </div>
            <div className="event-body">
              <div className="split">
                <span className="overline">
                  {dateLabel(x.date)} · {x.time}
                </span>
                <StatusBadge value={x.status} />
              </div>
              <h3>{x.title}</h3>
              <p>{x.description}</p>
              <div className="detail-row">
                <span>
                  <Building2 size={15} />
                  {x.venue}
                </span>
                <span>
                  <UsersRound size={15} />
                  {x.capacity} seats
                </span>
              </div>
              <div className="split event-bottom">
                <b>{fmt(x.price)}</b>
                <Button
                  variant="secondary"
                  onClick={() => openModal('event', x)}
                >
                  Manage event
                </Button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="add-card"
          onClick={() => openModal('event')}
        >
          <Plus size={25} />
          <b>Create a new event</b>
          <span>Add photos, tickets and venue details</span>
        </button>
      </div>
    </>
  );
};

export default EventsGrid;
