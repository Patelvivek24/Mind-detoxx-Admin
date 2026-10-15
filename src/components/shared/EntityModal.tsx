'use client';

import React, { useState } from 'react';
import { Trash2, Save, Info } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { EntityKind } from '@/types/studio';
import { iso, uid, dateLabel, fmt, REFERENCE_NOW, weekdays } from '@/lib/utils/formatters';
import { Modal } from '@/components/ui/Modal';
import { Field } from '@/components/ui/Field';
import { Button } from '@/components/ui/Button';

export interface EntityModalProps {
  kind: EntityKind;
  value: any;
  onClose: () => void;
}

export const EntityModal: React.FC<EntityModalProps> = ({ kind, value, onClose }) => {
  const { db, setDb, isAdmin, saveRow, removeRow, flash } = useStudio();

  const seeds: Record<EntityKind, any> = {
    activity: {
      id: uid('a'),
      name: '',
      category: 'Movement',
      duration: 60,
      price: '',
      mode: 'Class',
      status: 'Draft',
      image: '',
      video: '',
      description: '',
    },
    session: {
      id: uid('s'),
      date: iso(REFERENCE_NOW),
      time: '08:00',
      duration: 60,
      activity: 'Yoga',
      instructor: '',
      capacity: 12,
      status: 'Scheduled',
    },
    recurring: {
      activity: 'Yoga',
      time: '08:00',
      duration: 60,
      capacity: 12,
      instructor: '',
      days: [1, 3, 5],
      start: iso(REFERENCE_NOW),
      weeks: 4,
    },
    plan: {
      id: uid('p'),
      name: '',
      price: '',
      period: '1 month',
      type: 'Monthly',
      sessions: '',
      description: '',
      status: 'Draft',
    },
    booking: {
      id: 'MDX-' + Math.floor(1000 + Math.random() * 9000),
      customer: '',
      phone: '',
      kind: 'Single class',
      item: '',
      date: iso(REFERENCE_NOW),
      amount: '',
      payment: 'Unpaid',
      status: 'Enquiry',
      source: 'Admin',
      sessionId: '',
      planId: '',
    },
    event: {
      id: uid('e'),
      title: '',
      date: iso(REFERENCE_NOW),
      time: '17:00',
      venue: 'Mind DetoxX Studio, Surat',
      capacity: 20,
      price: '',
      status: 'Draft',
      description: '',
      image: '',
    },
    rental: {
      id: uid('r'),
      customer: '',
      phone: '',
      date: iso(REFERENCE_NOW),
      start: '10:00',
      end: '12:00',
      purpose: '',
      amount: '',
      status: 'Enquiry',
      payment: 'Unpaid',
    },
    enquiry: {
      id: uid('q'),
      name: '',
      phone: '',
      type: 'Activity',
      interest: '',
      date: iso(REFERENCE_NOW),
      status: 'New',
      note: '',
    },
  };

  const [data, setData] = useState<any>({ ...seeds[kind], ...value });

  const renderField = (
    key: string,
    label: string,
    type = 'text',
    options?: string[] | null,
    help?: string
  ) => (
    <Field
      key={key}
      label={label}
      type={type}
      options={options}
      value={data[key]}
      onChange={(v) => setData({ ...data, [key]: v })}
      help={help}
    />
  );

  const keyMap: Record<EntityKind, string> = {
    activity: 'activities',
    session: 'sessions',
    plan: 'plans',
    booking: 'bookings',
    event: 'events',
    rental: 'rentals',
    enquiry: 'enquiries',
    recurring: 'sessions',
  };

  const handleSave = () => {
    if (kind === 'recurring') {
      const newRows: any[] = [];
      const start = new Date(data.start + 'T12:00:00');
      for (let i = 0; i < Number(data.weeks) * 7; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        if (data.days.includes(day.getDay())) {
          newRows.push({
            id: uid('s'),
            date: iso(day),
            time: data.time,
            duration: Number(data.duration),
            activity: data.activity,
            instructor: data.instructor,
            capacity: Number(data.capacity),
            status: 'Scheduled',
          });
        }
      }
      setDb((prev) => ({
        ...prev,
        sessions: [...prev.sessions, ...newRows],
        audit: [
          {
            at: new Date().toISOString(),
            actor: prev.role,
            action: 'Generated',
            entity: `${newRows.length} recurring sessions`,
          },
          ...prev.audit,
        ],
      }));
      flash(`${newRows.length} classes added to the calendar`);
      onClose();
      return;
    }

    const requiredMap: Record<string, string> = {
      activity: 'name',
      plan: 'name',
      booking: 'customer',
      event: 'title',
      rental: 'customer',
      enquiry: 'name',
      session: 'activity',
    };

    const requiredField = requiredMap[kind];
    if (requiredField && !String(data[requiredField] || '').trim()) {
      flash('Complete the required name or title first');
      return;
    }

    if (kind === 'booking' && data.kind === 'Single class' && data.sessionId && data.status === 'Confirmed') {
      const s = db.sessions.find((x) => x.id === data.sessionId);
      const used = db.bookings.filter(
        (x) => x.sessionId === data.sessionId && x.status === 'Confirmed' && x.id !== data.id
      ).length;
      if (s && used >= Number(s.capacity)) {
        flash('This class is full');
        return;
      }
    }

    if (!isAdmin) {
      if (kind === 'plan') {
        flash('Only Super Admin can change plans and prices');
        return;
      }
      if (['activity', 'event'].includes(kind)) {
        data.price = value?.price || '';
        data.status = value?.status || 'Draft';
      }
      if (kind === 'booking') {
        data.payment = value?.payment || 'Unpaid';
      }
      if (kind === 'rental') {
        data.amount = value?.amount || '';
      }
    }

    saveRow(keyMap[kind], data, Boolean(value?.id));
  };

  const titleMap: Record<EntityKind, string> = {
    activity: 'Activity',
    session: 'Class session',
    recurring: 'Repeat weekly classes',
    plan: 'Membership plan',
    booking: 'Booking',
    event: 'Event or retreat',
    rental: 'Studio rental',
    enquiry: 'Enquiry',
  };

  const isWide = ['activity', 'event', 'recurring'].includes(kind);

  return (
    <Modal
      title={(value && value.id ? 'Edit ' : 'Add ') + titleMap[kind]}
      subtitle={
        kind === 'recurring'
          ? 'Generate concrete classes for selected days of the week.'
          : kind === 'session'
          ? 'Place a dated class on the calendar.'
          : 'Changes save to this browser demonstration.'
      }
      onClose={onClose}
      wide={isWide}
      footer={
        <>
          {value?.id && isAdmin && (
            <button
              className="delete-link"
              onClick={() => {
                removeRow(keyMap[kind], value.id);
                onClose();
              }}
            >
              <Trash2 size={15} /> Archive
            </button>
          )}
          <div className="grow" />
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button icon={Save} onClick={handleSave}>
            {kind === 'recurring' ? 'Create classes' : 'Save changes'}
          </Button>
        </>
      }
    >
      {kind === 'activity' && (
        <div className="form-grid">
          {renderField('name', 'Activity name')}
          {renderField('category', 'Category', 'text', ['Movement', 'Healing', 'Stillness', 'Guidance'])}
          {renderField('duration', 'Duration in minutes', 'number')}
          {renderField('mode', 'Booking mode', 'text', ['Class', 'Course', 'Appointment', 'Event only', 'Enquiry'])}
          {renderField('price', 'Single session price in ₹', 'number', null, 'Leave blank until approved')}
          {renderField('status', 'Visibility', 'text', isAdmin ? ['Draft', 'Published'] : ['Draft'])}
          <div className="span2">{renderField('description', 'Description', 'textarea')}</div>
          <div className="span2">{renderField('image', 'Image URL', 'text', null, 'Use a URL from Media library')}</div>
          <div className="span2">{renderField('video', 'Video URL')}</div>
        </div>
      )}

      {kind === 'session' && (
        <div className="form-grid">
          {renderField(
            'activity',
            'Activity',
            'text',
            db.activities.filter((x) => x.mode === 'Class').map((x) => x.name)
          )}
          {renderField('date', 'Class date', 'date')}
          {renderField('time', 'Start time', 'time')}
          {renderField('duration', 'Duration in minutes', 'number')}
          {renderField('capacity', 'Maximum seats', 'number')}
          {renderField('instructor', 'Instructor')}
          {renderField('status', 'Session status', 'text', ['Scheduled', 'Cancelled'])}
        </div>
      )}

      {kind === 'recurring' && (
        <>
          <div className="form-grid">
            {renderField(
              'activity',
              'Activity',
              'text',
              db.activities.filter((x) => x.mode === 'Class').map((x) => x.name)
            )}
            {renderField('time', 'Start time', 'time')}
            {renderField('duration', 'Duration in minutes', 'number')}
            {renderField('capacity', 'Seats per class', 'number')}
            {renderField('start', 'Start generating from', 'date')}
            {renderField('weeks', 'Number of weeks', 'number')}
            {renderField('instructor', 'Instructor')}
          </div>
          <div className="field">
            <span>Repeat on days</span>
            <div className="day-picker">
              {weekdays.map((day, i) => (
                <button
                  key={day}
                  type="button"
                  className={data.days?.includes(i) ? 'selected' : ''}
                  onClick={() =>
                    setData({
                      ...data,
                      days: data.days?.includes(i)
                        ? data.days.filter((x: number) => x !== i)
                        : [...(data.days || []), i],
                    })
                  }
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <p className="footnote">
            For the demo, recurring sessions are generated for the selected number of weeks. Check
            holidays and studio closures before publishing a real timetable.
          </p>
        </>
      )}

      {kind === 'plan' && (
        <div className="form-grid">
          {renderField('name', 'Plan name')}
          {renderField('type', 'Plan type', 'text', ['Monthly', 'Group', 'Drop-in', 'Quarterly'])}
          {renderField('price', 'Price in ₹', 'number')}
          {renderField('period', 'Validity')}
          {renderField('sessions', 'Included classes or batch')}
          {renderField('status', 'Visibility', 'text', isAdmin ? ['Draft', 'Published'] : ['Draft'])}
          <div className="span2">{renderField('description', 'Description', 'textarea')}</div>
        </div>
      )}

      {kind === 'booking' && (
        <div className="form-grid">
          {renderField('customer', 'Customer name')}
          {renderField('phone', 'Phone number', 'tel')}
          <Field
            label="Booking type"
            value={data.kind}
            options={['Single class', 'Monthly', 'Group', 'Event', 'Rental']}
            onChange={(v) => setData({ ...data, kind: v, sessionId: '', planId: '' })}
          />
          {data.kind === 'Single class' && (
            <label className="field">
              <span>Class session</span>
              <select
                value={data.sessionId || ''}
                onChange={(e) => {
                  const s = db.sessions.find((x) => x.id === e.target.value);
                  const a = db.activities.find((x) => x.name === s?.activity);
                  setData({
                    ...data,
                    sessionId: e.target.value,
                    item: s ? `${s.activity} · ${s.time}` : '',
                    date: s?.date || data.date,
                    amount: a?.price || '',
                  });
                }}
              >
                <option value="">Select a dated class</option>
                {db.sessions
                  .filter((x) => x.status === 'Scheduled')
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {dateLabel(s.date)} · {s.time} · {s.activity}
                    </option>
                  ))}
              </select>
            </label>
          )}
          {['Monthly', 'Group'].includes(data.kind) && (
            <label className="field">
              <span>Membership plan</span>
              <select
                value={data.planId || ''}
                onChange={(e) => {
                  const p = db.plans.find((x) => x.id === e.target.value);
                  setData({
                    ...data,
                    planId: e.target.value,
                    item: p?.name || '',
                    amount: p?.price || '',
                  });
                }}
              >
                <option value="">Select a plan</option>
                {db.plans
                  .filter((x) => x.type !== 'Drop-in')
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} · {fmt(p.price)}
                    </option>
                  ))}
              </select>
            </label>
          )}
          {renderField('item', 'Class, plan or event')}
          {renderField('date', 'Booking date', 'date')}
          {renderField('amount', 'Amount in ₹', 'number')}
          {renderField('payment', 'Payment state', 'text', ['Unpaid', 'Pending', 'Paid', 'Refunded'])}
          {renderField('status', 'Booking status', 'text', ['Enquiry', 'Awaiting payment', 'Confirmed', 'Cancelled'])}
          <div className="span2">
            <div className="notice compact">
              <Info size={17} />
              Manual Paid status is for demo records only. Live gateway payments require verified callbacks.
            </div>
          </div>
        </div>
      )}

      {kind === 'event' && (
        <div className="form-grid">
          {renderField('title', 'Event title')}
          {renderField('date', 'Date', 'date')}
          {renderField('time', 'Start time', 'time')}
          {renderField('venue', 'Venue')}
          {renderField('capacity', 'Ticket capacity', 'number')}
          {renderField('price', 'Ticket price in ₹', 'number')}
          {renderField('status', 'Visibility', 'text', isAdmin ? ['Draft', 'Published', 'Cancelled'] : ['Draft'])}
          {renderField('image', 'Cover image URL')}
          <div className="span2">{renderField('description', 'Full description', 'textarea')}</div>
        </div>
      )}

      {kind === 'rental' && (
        <div className="form-grid">
          {renderField('customer', 'Contact name')}
          {renderField('phone', 'Phone number', 'tel')}
          {renderField('date', 'Date', 'date')}
          {renderField('purpose', 'Purpose')}
          {renderField('start', 'Start time', 'time')}
          {renderField('end', 'End time', 'time')}
          {renderField('amount', 'Quoted amount in ₹', 'number')}
          {renderField('status', 'Request status', 'text', ['Enquiry', 'Pending', 'Confirmed', 'Cancelled'])}
          {renderField('payment', 'Payment state', 'text', ['Unpaid', 'Pending', 'Paid'])}
        </div>
      )}

      {kind === 'enquiry' && (
        <div className="form-grid">
          {renderField('name', 'Contact name')}
          {renderField('phone', 'Phone number', 'tel')}
          {renderField('type', 'Enquiry type', 'text', ['Activity', 'Membership', 'Event', 'Rental', 'General'])}
          {renderField('date', 'Preferred date', 'date')}
          {renderField('interest', 'Interest or requested service')}
          {renderField('status', 'Follow-up status', 'text', ['New', 'Contacted', 'Resolved'])}
          <div className="span2">{renderField('note', 'Internal notes', 'textarea')}</div>
        </div>
      )}
    </Modal>
  );
};

export default EntityModal;
