'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { StudioDB, Role, EntityKind, AuditEntry } from '@/types/studio';
import { initialStudioData } from '@/lib/data/initialData';

interface StudioContextType {
  db: StudioDB;
  setDb: React.Dispatch<React.SetStateAction<StudioDB>>;
  isAdmin: boolean;
  toggleRole: () => void;
  toast: string;
  flash: (message: string) => void;
  saveRow: (key: string, row: any, isEditing?: boolean) => void;
  updateRow: (key: string, id: string, patch: Record<string, any>) => void;
  removeRow: (key: string, id: string) => void;
  modal: EntityKind | null;
  editingItem: any;
  openModal: (kind: EntityKind, item?: any) => void;
  closeModal: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  isHydrated: boolean;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_KEY = 'mdx-admin-v2';

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<StudioDB>(initialStudioData);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState<EntityKind | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setDb((prev) => ({
          ...prev,
          ...parsed,
          content: { ...prev.content, ...(parsed.content || {}) },
          settings: { ...prev.settings, ...(parsed.settings || {}) },
        }));
      }
    } catch {
      // Ignore fallback to initial
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage after hydration
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      } catch {
        // storage quota exceeded or disabled
      }
    }
  }, [db, isHydrated]);

  const flash = useCallback((text: string) => {
    setToast(text);
    setTimeout(() => {
      setToast('');
    }, 3500);
  }, []);

  const isAdmin = db.role === 'Super Admin';

  const toggleRole = useCallback(() => {
    setDb((prev) => {
      const newRole: Role = prev.role === 'Super Admin' ? 'Staff' : 'Super Admin';
      return { ...prev, role: newRole };
    });
  }, []);

  const createLog = (action: string, entity: string): AuditEntry => ({
    at: new Date().toISOString(),
    actor: db.role,
    action,
    entity,
  });

  const saveRow = useCallback(
    (key: string, row: any, isEditing = false) => {
      setDb((prev) => {
        const list = (prev as any)[key] as any[];
        const exists = list.some((x: any) => x.id === row.id);
        const nextList = exists
          ? list.map((x: any) => (x.id === row.id ? row : x))
          : [row, ...list];
        const logEntry = createLog(
          isEditing ? 'Updated' : 'Created',
          `${key} ${row.name || row.title || row.id}`
        );
        return {
          ...prev,
          [key]: nextList,
          audit: [logEntry, ...prev.audit].slice(0, 100),
        };
      });
      setModal(null);
      setEditingItem(null);
      flash('Saved successfully');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db.role, flash]
  );

  const updateRow = useCallback(
    (key: string, id: string, patch: Record<string, any>) => {
      setDb((prev) => {
        const list = (prev as any)[key] as any[];
        const nextList = list.map((x: any) => (x.id === id ? { ...x, ...patch } : x));
        const logEntry = createLog('Updated', `${key} ${id}`);
        return {
          ...prev,
          [key]: nextList,
          audit: [logEntry, ...prev.audit].slice(0, 100),
        };
      });
      flash('Updated successfully');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db.role, flash]
  );

  const removeRow = useCallback(
    (key: string, id: string) => {
      if (typeof window !== 'undefined' && !window.confirm('Archive this item from the demo?')) {
        return;
      }
      setDb((prev) => {
        const list = (prev as any)[key] as any[];
        const nextList = list.filter((x: any) => x.id !== id);
        const logEntry = createLog('Archived', `${key} ${id}`);
        return {
          ...prev,
          [key]: nextList,
          audit: [logEntry, ...prev.audit].slice(0, 100),
        };
      });
      flash('Item archived');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [db.role, flash]
  );

  const openModal = useCallback((kind: EntityKind, item?: any) => {
    setEditingItem(item || null);
    setModal(kind);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setEditingItem(null);
  }, []);

  return (
    <StudioContext.Provider
      value={{
        db,
        setDb,
        isAdmin,
        toggleRole,
        toast,
        flash,
        saveRow,
        updateRow,
        removeRow,
        modal,
        editingItem,
        openModal,
        closeModal,
        drawerOpen,
        setDrawerOpen,
        isHydrated,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
