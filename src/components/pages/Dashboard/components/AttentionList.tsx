'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Sparkles, WalletCards, ChevronRight } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';

export const AttentionList: React.FC = () => {
  const { db } = useStudio();

  const newEnquiriesCount = db.enquiries.filter((x) => x.status === 'New').length;
  const draftActivitiesCount = db.activities.filter((x) => x.status === 'Draft').length;

  return (
    <section className="card dashboard-panel">
      <div className="panel-head">
        <div>
          <h2>Needs your attention</h2>
          <p>Content and requests to review</p>
        </div>
      </div>

      <Link href="/enquiries" className="attention">
        <span className="attention-icon amber">
          <MessageCircle size={18} />
        </span>
        <div>
          <b>{newEnquiriesCount} new enquiries</b>
          <small>Reply and convert interest into bookings</small>
        </div>
        <ChevronRight size={17} />
      </Link>

      <Link href="/activities" className="attention">
        <span className="attention-icon teal">
          <Sparkles size={18} />
        </span>
        <div>
          <b>{draftActivitiesCount} activity drafts</b>
          <small>Review media and publishing details</small>
        </div>
        <ChevronRight size={17} />
      </Link>

      <Link href="/plans" className="attention">
        <span className="attention-icon purple">
          <WalletCards size={18} />
        </span>
        <div>
          <b>Prices awaiting approval</b>
          <small>Single class and rental terms need sign-off</small>
        </div>
        <ChevronRight size={17} />
      </Link>
    </section>
  );
};

export default AttentionList;
