'use client';

import React, { useState } from 'react';
import { Upload, Copy, Info } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { EmptyState } from '@/components/ui/EmptyState';
import { uid } from '@/lib/utils/formatters';

export const MediaLibrary: React.FC = () => {
  const { db, setDb, flash } = useStudio();
  const [busy, setBusy] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1500000) {
      flash('For this browser demo, use an image under 1.5 MB');
      return;
    }

    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      const item = {
        id: uid('m'),
        name: file.name,
        type: file.type,
        data: reader.result as string,
      };
      setDb((prev) => ({
        ...prev,
        media: [item, ...prev.media],
      }));
      setBusy(false);
      flash('Media uploaded to this browser');
    };
    reader.readAsDataURL(file);
  };

  const copyUrl = (data: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(data)
        .then(() => flash('Media link copied'))
        .catch(() => flash('Copy unavailable'));
    } else {
      flash('Copy unavailable');
    }
  };

  return (
    <>
      <div className="media-upload">
        <div className="upload-icon">
          <Upload size={25} />
        </div>
        <div>
          <h2>Media library</h2>
          <p>
            Upload approved studio photos, activity images and page visuals. Files stay in this
            browser demo.
          </p>
        </div>
        <label className="btn upload-btn">
          <Upload size={16} />
          {busy ? 'Uploading...' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            hidden
          />
        </label>
      </div>

      <div className="media-grid">
        {db.media.length > 0 ? (
          db.media.map((x) => (
            <div className="card media-item" key={x.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={x.data} alt={x.name} />
              <div>
                <b>{x.name}</b>
                <button
                  type="button"
                  title="Copy media URL"
                  onClick={() => copyUrl(x.data)}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1' }}>
            <EmptyState
              title="No media uploaded"
              text="Upload a real studio image to use it in content editors."
            />
          </div>
        )}
      </div>

      <div className="notice">
        <Info size={18} />
        <span>
          Production uploads need cloud file storage, image resizing and video streaming. Browser
          storage is limited and is only for a client demonstration.
        </span>
      </div>
    </>
  );
};

export default MediaLibrary;
