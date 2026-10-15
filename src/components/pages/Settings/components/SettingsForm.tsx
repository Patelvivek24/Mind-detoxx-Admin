'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';

export const SettingsForm: React.FC = () => {
  const { db, setDb, isAdmin, toggleRole, flash } = useStudio();
  const [form, setForm] = useState(db.settings);

  const handleSave = () => {
    if (!isAdmin) {
      flash('Only Super Admin can change site settings');
      return;
    }
    setDb((prev) => ({
      ...prev,
      settings: form,
    }));
    flash('Settings saved');
  };

  const contactFields: [string, string][] = [
    ['phone', 'Public phone'],
    ['whatsapp', 'WhatsApp number'],
    ['instagram', 'Instagram handle'],
    ['address', 'Street address'],
  ];

  return (
    <div className="settings-grid">
      <div className="card settings-card">
        <h2>Studio details</h2>
        <p>These are shared contact details for the public site.</p>
        {contactFields.map(([key, label]) => (
          <Field
            key={key}
            label={label}
            value={(form as any)[key]}
            onChange={(v) => setForm({ ...form, [key]: v })}
          />
        ))}
        <Button icon={Save} onClick={handleSave}>
          Save settings
        </Button>
      </div>

      <div>
        <div className="card settings-card">
          <h2>Demo access</h2>
          <p>Switch role to demonstrate the publishing restriction.</p>
          <div className="setting-line">
            <span>Current role</span>
            <StatusBadge value={db.role} />
          </div>
          <Button
            variant="secondary full"
            onClick={toggleRole}
          >
            Switch to {isAdmin ? 'Staff' : 'Super Admin'}
          </Button>
        </div>

        <div className="card settings-card space-top">
          <h2>Payment configuration</h2>
          <div className="setting-line">
            <span>Gateway</span>
            <b>{form.gateway}</b>
          </div>
          <div className="setting-line">
            <span>Booking mode</span>
            <b>{form.bookingMode}</b>
          </div>
          <p className="footnote">
            No live keys or payment processing are included in this prototype.
          </p>
        </div>

        <div className="card settings-card space-top">
          <h2>Recent admin activity</h2>
          {db.audit.slice(0, 6).map((x, i) => (
            <div className="audit" key={i}>
              <span>
                {x.action} {x.entity}
              </span>
              <small>{x.actor}</small>
            </div>
          ))}
          {db.audit.length === 0 && <p>No changes recorded yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
