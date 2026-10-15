'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { navGroupsData } from '@/lib/constants/navigation';

export const Topbar: React.FC = () => {
  const pathname = usePathname();
  const { db, setDrawerOpen } = useStudio();

  // Find matching nav title
  let currentTitle = 'Dashboard';
  for (const group of navGroupsData) {
    for (const item of group.items) {
      if (item.href === '/' && pathname === '/') {
        currentTitle = item.title;
        break;
      } else if (item.href !== '/' && pathname.startsWith(item.href)) {
        currentTitle = item.title;
        break;
      }
    }
  }

  return (
    <header className="topbar">
      <button
        className="menu-btn"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open sidebar menu"
      >
        <Menu size={22} />
      </button>

      <div className="crumb">
        Studio admin <span>/</span> <b>{currentTitle}</b>
      </div>

      <div className="top-actions">
        <span className="today">Tuesday, 29 September 2026</span>
        <span className="top-role">{db.role}</span>
        <div className="top-avatar">MD</div>
      </div>
    </header>
  );
};

export default Topbar;
