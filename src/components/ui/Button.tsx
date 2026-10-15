import React from 'react';
import { type LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: '' | 'secondary' | 'light' | 'secondary full' | 'full' | string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon,
  variant = '',
  className = '',
  ...props
}) => {
  return (
    <button className={`btn ${variant} ${className}`.trim()} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;
