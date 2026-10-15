import React from 'react';

export interface StatusBadgeProps {
  value: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value }) => {
  let colorClass = 'muted';
  if (/Published|Paid|Confirmed|Active|Available|Resolved/.test(value)) {
    colorClass = 'green';
  } else if (/Draft|Pending|Awaiting|Enquiry|New/.test(value)) {
    colorClass = 'amber';
  }

  return (
    <span className={`status ${colorClass}`}>
      <i />
      {value}
    </span>
  );
};

export default StatusBadge;
