'use client';

import React from 'react';
import { WalletCards, Check, Clock } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { MiniMetric } from '@/components/ui/MiniMetric';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { fmt } from '@/lib/utils/formatters';

export const PaymentsLedger: React.FC = () => {
  const { db } = useStudio();

  const totalPaidAmount = db.bookings
    .filter((x) => x.payment === 'Paid')
    .reduce((s, x) => s + Number(x.amount || 0), 0);

  const paidOrdersCount = db.bookings.filter((x) => x.payment === 'Paid').length;
  const pendingOrdersCount = db.bookings.filter((x) => x.payment === 'Pending').length;

  return (
    <>
      <div className="notice">
        <WalletCards size={18} />
        <span>
          Gateway integration is planned. This is a read-only demonstration of booking payment
          states; no real transaction is processed.
        </span>
      </div>

      <div className="metrics-row">
        <MiniMetric
          label="Sample paid amount"
          value={fmt(totalPaidAmount)}
          icon={WalletCards}
        />
        <MiniMetric label="Paid orders" value={paidOrdersCount} icon={Check} />
        <MiniMetric label="Pending orders" value={pendingOrdersCount} icon={Clock} />
      </div>

      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>REFERENCE</th>
              <th>CUSTOMER</th>
              <th>PURPOSE</th>
              <th>AMOUNT</th>
              <th>PAYMENT STATUS</th>
            </tr>
          </thead>
          <tbody>
            {db.bookings.map((x) => (
              <tr key={x.id}>
                <td>
                  <b>{x.id}</b>
                </td>
                <td>{x.customer}</td>
                <td>
                  {x.kind} · {x.item}
                </td>
                <td>{fmt(x.amount)}</td>
                <td>
                  <StatusBadge value={x.payment} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentsLedger;
