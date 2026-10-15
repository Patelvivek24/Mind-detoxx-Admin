import React from 'react';
import { type LucideIcon } from 'lucide-react';

export interface PageHeadingProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
}) => {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          <Icon size={14} />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeading;
