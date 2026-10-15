'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Plus, ArrowUpRight } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { dateLabel, fmt } from '@/lib/utils/formatters';

export const RentalsList: React.FC = () => {
  const { db, openModal } = useStudio();

  return (
    <>
      <div className="section-head">
        <div>
          <h2>Rental requests</h2>
          <p>Approve studio use after confirming time, terms and availability.</p>
        </div>
        <Button icon={Plus} onClick={() => openModal('rental')}>
          Add request
        </Button>
      </div>

      <div className="rental-banner">
        <Building2 size={22} />
        <div>
          <b>Weekend studio rate · ₹1,500/hour</b>
          <span>Other rates, deposit and minimum duration need confirmation.</span>
        </div>
        <Link href="/content/rental">
          <button type="button">
            Edit public page <ArrowUpRight size={15} />
          </button>
        </Link>
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>CLIENT</th>
              <th>DATE / TIME</th>
              <th>PURPOSE</th>
              <th>ESTIMATE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {db.rentals.map((x) => (
              <tr key={x.id}>
                <td>
                  <b>{x.customer}</b>
                  <small className="stack">{x.phone}</small>
                </td>
                <td>
                  {dateLabel(x.date)}
                  <small className="stack">
                    {x.start} – {x.end}
                  </small>
                </td>
                <td>{x.purpose}</td>
                <td>{fmt(x.amount)}</td>
                <td>
                  <StatusBadge value={x.status} />
                </td>
                <td>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => openModal('rental', x)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RentalsList;
