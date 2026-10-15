'use client';

import React from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Topbar } from '@/components/shared/Topbar';
import { Toast } from '@/components/ui/Toast';
import { EntityModal } from '@/components/shared/EntityModal';
import { useStudio } from '@/providers/StudioProvider';

export const StudioLayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast, modal, editingItem, closeModal } = useStudio();

  return (
    <div className="app">
      <Sidebar />
      <div className="main-shell">
        <Topbar />
        <main>{children}</main>
      </div>
      <Toast message={toast} />
      {modal && (
        <EntityModal
          kind={modal}
          value={editingItem}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StudioLayoutShell;
