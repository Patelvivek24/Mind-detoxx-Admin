'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, ShieldCheck } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { navGroupsData } from '@/lib/constants/navigation';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { db, isAdmin, toggleRole, drawerOpen, setDrawerOpen } = useStudio();

  const newEnquiriesCount = db.enquiries.filter((x) => x.status === 'New').length;

  return (
    <>
      <aside className={`sidebar ${drawerOpen ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-symbol">✺</span>
          <div>
            <strong>MIND DETOXX</strong>
            <small>STUDIO ADMIN</small>
          </div>
          <button
            className="mobile-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
          >
            <X size={19} />
          </button>
        </div>

        <div className="workspace">
          <span className="workspace-mark">M</span>
          <div>
            <b>Surat Studio</b>
            <small>VIP Road · Active</small>
          </div>
          <ChevronDown size={15} />
        </div>

        <nav>
          {navGroupsData.map((group) => (
            <div className="nav-group" key={group.group}>
              <div className="nav-label">{group.group}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {item.key === 'enquiries' && newEnquiriesCount > 0 && (
                      <i className="nav-count">{newEnquiriesCount}</i>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="demo-tag">
            <span className="pulse" />
            CLIENT DEMO MODE
          </div>
          <div className="profile">
            <div className="avatar">MD</div>
            <div>
              <b>Mind DetoxX</b>
              <small>{db.role}</small>
            </div>
            <button
              title="Toggle role between Super Admin & Staff"
              onClick={toggleRole}
              aria-label="Change role"
            >
              <ShieldCheck size={17} />
            </button>
          </div>
        </div>
      </aside>

      {drawerOpen && (
        <div
          className="scrim"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
