'use client';

import React, { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { Toolbar } from '@/components/ui/Toolbar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { fmt } from '@/lib/utils/formatters';

export const ActivitiesTable: React.FC = () => {
  const { db, openModal } = useStudio();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredActivities = db.activities.filter((x) => {
    const matchesFilter =
      filter === 'All' || x.status === filter || x.category === filter;
    const matchesSearch = x.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Toolbar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filters={[
          'All',
          'Published',
          'Draft',
          'Movement',
          'Healing',
          'Stillness',
          'Guidance',
        ]}
        action={
          <Button icon={Plus} onClick={() => openModal('activity')}>
            Add activity
          </Button>
        }
      />

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>ACTIVITY</th>
              <th>CATEGORY</th>
              <th>DURATION</th>
              <th>BOOKING</th>
              <th>PRICE</th>
              <th>VISIBILITY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((x) => (
              <tr key={x.id}>
                <td>
                  <div className="name-cell">
                    <div className="row-image">
                      {x.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={x.image} alt={x.name} />
                      ) : (
                        <Sparkles size={19} />
                      )}
                    </div>
                    <div>
                      <b>{x.name}</b>
                      <small>{x.description}</small>
                    </div>
                  </div>
                </td>
                <td>{x.category}</td>
                <td>{x.duration} min</td>
                <td>{x.mode}</td>
                <td>{fmt(x.price)}</td>
                <td>
                  <StatusBadge value={x.status} />
                </td>
                <td>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => openModal('activity', x)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="footnote">
        Activity prices are intentionally blank until approved. Draft activities do not appear on
        the public site.
      </p>
    </>
  );
};

export default ActivitiesTable;
