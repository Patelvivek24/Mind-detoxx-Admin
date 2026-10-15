import React from 'react';
import Link from 'next/link';
import { House } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <div className="card" style={{ padding: '36px' }}>
        <h1 style={{ fontSize: '48px', margin: '0', color: '#45e0cd', fontFamily: 'var(--font-display)' }}>
          404
        </h1>
        <h2 style={{ margin: '12px 0 8px', color: '#edf9f5', fontSize: '18px' }}>
          Page not found
        </h2>
        <p style={{ color: '#87a8a8', fontSize: '12px', marginBottom: '24px' }}>
          The section or resource you are looking for does not exist in the studio admin.
        </p>
        <Link href="/">
          <Button icon={House}>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
