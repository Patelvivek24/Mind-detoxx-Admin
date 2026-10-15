'use client';

import React, { useState } from 'react';
import { BookOpen, Check, Clock, Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { MiniMetric } from '@/components/ui/MiniMetric';
import { Toolbar } from '@/components/ui/Toolbar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { dateLabel, fmt } from '@/lib/utils/formatters';

export const BookingsTable: React.FC = () => {
  const { db, openModal } = useStudio();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const totalBookings = db.bookings.length;
  const confirmedCount = db.bookings.filter((x) => x.status === 'Confirmed').length;
  const pendingCount = db.bookings.filter((x) => x.payment === 'Pending').length;

  const filteredBookings = db.bookings.filter((x) => {
    const matchesFilter = filter === 'All' || x.status === filter;
    const matchesSearch = `${x.id} ${x.customer} ${x.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="metrics-row">
        <MiniMetric label="Total bookings" value={totalBookings} icon={BookOpen} />
        <MiniMetric label="Confirmed" value={confirmedCount} icon={Check} />
        <MiniMetric label="Awaiting payment" value={pendingCount} icon={Clock} />
      </div>

      <Toolbar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filters={['All', 'Confirmed', 'Awaiting payment', 'Enquiry', 'Cancelled']}
        action={
          <Button icon={Plus} onClick={() => openModal('booking')}>
            New booking
          </Button>
        }
      />

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>REFERENCE / CUSTOMER</th>
              <th>TYPE</th>
              <th>ITEM</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>PAYMENT</th>
              <th>BOOKING</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((x) => (
              <tr key={x.id}>
                <td>
                  <b>{x.id}</b>
                  <small className="stack">
                    {x.customer} · {x.phone}
                  </small>
                </td>
                <td>{x.kind}</td>
                <td>{x.item}</td>
                <td>{dateLabel(x.date)}</td>
                <td>{fmt(x.amount)}</td>
                <td>
                  <StatusBadge value={x.payment} />
                </td>
                <td>
                  <StatusBadge value={x.status} />
                </td>
                <td>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => openModal('booking', x)}
                  >
                    View / edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="footnote">
        Attendance is outside this prototype. Payment statuses are sample data and cannot charge
        customers.
      </p>
    </>
  );
};

export default BookingsTable;
