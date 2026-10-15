import React from 'react';
import { Sparkles, type LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  text?: string;
  action?: React.ReactNode;
  icon?: LucideIcon;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nothing here yet',
  text = 'Add the first item to get started.',
  action,
  icon: Icon = Sparkles,
}) => {
  return (
    <div className="empty">
      <Icon size={26} />
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
};

export default EmptyState;
