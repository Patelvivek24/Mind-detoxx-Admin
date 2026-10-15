'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <Check size={16} />
      <span>{message}</span>
    </div>
  );
};

export default Toast;
