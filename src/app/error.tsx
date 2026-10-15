'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error caught by boundary:', error);
  }, [error]);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '32px' }}>
        <AlertCircle size={40} style={{ color: '#e69e91', margin: '0 auto 16px' }} />
        <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)', color: '#f0faf7' }}>
          Something went wrong
        </h2>
        <p style={{ color: '#8faead', fontSize: '13px', marginBottom: '24px' }}>
          {error.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <Button icon={RotateCcw} onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
