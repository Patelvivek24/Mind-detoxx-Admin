'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { Toolbar } from '@/components/ui/Toolbar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { dateLabel } from '@/lib/utils/formatters';

export const EnquiriesTable: React.FC = () => {
  const { db, openModal } = useStudio();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredEnquiries = db.enquiries.filter((x) => {
    const matchesFilter = filter === 'All' || x.status === filter;
    const matchesSearch = `${x.name} ${x.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Toolbar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filters={['All', 'New', 'Contacted', 'Resolved']}
        action={
          <Button icon={Plus} onClick={() => openModal('enquiry')}>
            Add enquiry
          </Button>
        }
      />

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>PERSON</th>
              <th>INTEREST</th>
              <th>TYPE</th>
              <th>REQUESTED</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((x) => (
              <tr key={x.id}>
                <td>
                  <b>{x.name}</b>
                  <small className="stack">{x.phone}</small>
                </td>
                <td>{x.interest}</td>
                <td>{x.type}</td>
                <td>{dateLabel(x.date)}</td>
                <td>
                  <StatusBadge value={x.status} />
                </td>
                <td>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => openModal('enquiry', x)}
                  >
                    Open
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

export default EnquiriesTable;
