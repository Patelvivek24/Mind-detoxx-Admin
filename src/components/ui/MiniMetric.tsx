import React from 'react';
import { type LucideIcon } from 'lucide-react';

export interface MiniMetricProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export const MiniMetric: React.FC<MiniMetricProps> = ({ label, value, icon: Icon }) => {
  return (
    <div className="card mini">
      <div className="mini-icon">
        <Icon size={19} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
};

export default MiniMetric;
