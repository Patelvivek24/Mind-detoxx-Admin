'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, House, Info, Sparkles, PartyPopper, Building2 } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';

const quickCards = [
  { key: 'home', label: 'Home page', href: '/content/home', icon: House, contentKey: 'home' },
  { key: 'about', label: 'About us', href: '/content/about', icon: Info, contentKey: 'about' },
  { key: 'activities', label: 'Activities', href: '/activities', icon: Sparkles, contentKey: null },
  { key: 'retreatsContent', label: 'Retreats', href: '/content/retreats', icon: PartyPopper, contentKey: 'retreats' },
  { key: 'rentalContent', label: 'Studio rental', href: '/content/rental', icon: Building2, contentKey: 'rental' },
];

export const QuickPublishGrid: React.FC = () => {
  const { db } = useStudio();

  return (
    <>
      <div className="section-head spaced">
        <div>
          <h2>Website publishing</h2>
          <p>Quickly jump into a page editor.</p>
        </div>
      </div>
      <div className="quick-grid">
        {quickCards.map((card) => {
          const Icon = card.icon;
          const status = card.contentKey
            ? (db.content as any)[card.contentKey]?.status || 'Draft'
            : 'Catalogue';

          return (
            <Link key={card.key} href={card.href} className="quick-card">
              <Icon size={21} />
              <b>{card.label}</b>
              <span>{status}</span>
              <ArrowUpRight size={16} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default QuickPublishGrid;
