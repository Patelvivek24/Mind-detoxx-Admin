import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '50vh', color: '#45e0cd' }}>
      <div style={{ textAlign: 'center' }}>
        <Sparkles size={36} className="pulse" />
        <p style={{ marginTop: '12px', fontSize: '13px', color: '#8faead' }}>
          Loading studio workspace...
        </p>
      </div>
    </div>
  );
}
