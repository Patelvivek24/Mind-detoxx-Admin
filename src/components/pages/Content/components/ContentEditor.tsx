'use client';

import React, { useState } from 'react';
import { Eye, Save, Check, Plus } from 'lucide-react';
import { useStudio } from '@/providers/StudioProvider';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Field } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';

export interface ContentEditorProps {
  section: 'home' | 'about' | 'retreats' | 'rental';
}

const sectionTitles: Record<string, string> = {
  home: 'Home page',
  about: 'About us',
  retreats: 'Retreats page',
  rental: 'Rental page',
};

export const ContentEditor: React.FC<ContentEditorProps> = ({ section }) => {
  const { db, setDb, isAdmin, flash } = useStudio();
  const original = db.content[section];
  const [draft, setDraft] = useState<any>(original);
  const [tab, setTab] = useState<'Content' | 'Media' | 'SEO'>('Content');
  const [preview, setPreview] = useState(false);

  const fields: Record<string, [string, string, string?][]> = {
    home: [
      ['heroEyebrow', 'Eyebrow'],
      ['heroTitle', 'Hero heading'],
      ['heroSubtitle', 'Hero description', 'textarea'],
      ['primaryCTA', 'Primary button label'],
      ['secondaryCTA', 'Secondary button label'],
      ['introTitle', 'Introduction heading'],
      ['introBody', 'Introduction text', 'textarea'],
    ],
    about: [
      ['title', 'Page heading'],
      ['story', 'Studio story', 'textarea'],
      ['values', 'Mantra / values'],
      ['founderName', 'Founder name'],
      ['founderBio', 'Founder bio', 'textarea'],
      ['studioAddress', 'Studio address'],
    ],
    retreats: [
      ['title', 'Page heading'],
      ['intro', 'Introduction', 'textarea'],
    ],
    rental: [
      ['title', 'Page heading'],
      ['intro', 'Introduction', 'textarea'],
      ['amenities', 'Amenities', 'textarea'],
      ['terms', 'Rental terms', 'textarea'],
    ],
  };

  const mediaFields: Record<string, [string, string][]> = {
    home: [
      ['heroMedia', 'Hero video or image URL'],
      ['heroPoster', 'Fallback image URL'],
    ],
    about: [['studioImage', 'Studio image URL']],
    retreats: [['heroMedia', 'Cover image URL']],
    rental: [['heroMedia', 'Cover image URL']],
  };

  const handleSave = (status: 'Published' | 'Draft') => {
    if (status === 'Published' && !isAdmin) {
      flash('Only Super Admin can publish');
      return;
    }
    setDb((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: { ...draft, status },
      },
      audit: [
        {
          at: new Date().toISOString(),
          actor: prev.role,
          action: status === 'Published' ? 'Published' : 'Saved draft',
          entity: `${section} page`,
        },
        ...prev.audit,
      ].slice(0, 100),
    }));
    setDraft({ ...draft, status });
    flash(status === 'Published' ? 'Page published in demo' : 'Draft saved');
  };

  const heroBackground = draft.heroMedia || draft.studioImage;

  return (
    <>
      <div className="editor-header">
        <div className="editor-tabs">
          {(['Content', 'Media', 'SEO'] as const).map((x) => (
            <button
              key={x}
              type="button"
              className={tab === x ? 'selected' : ''}
              onClick={() => setTab(x)}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="editor-actions">
          <StatusBadge value={draft.status} />
          <Button variant="secondary" icon={Eye} onClick={() => setPreview(true)}>
            Preview
          </Button>
          <Button
            variant="secondary"
            icon={Save}
            onClick={() => handleSave('Draft')}
          >
            Save draft
          </Button>
          {isAdmin && (
            <Button icon={Check} onClick={() => handleSave('Published')}>
              Publish
            </Button>
          )}
        </div>
      </div>

      <div className="editor-layout">
        <div className="card editor-form">
          {tab === 'Content' && (
            <>
              <div className="form-intro">
                <h2>{sectionTitles[section]} content</h2>
                <p>These fields appear on the public page after publishing.</p>
              </div>

              {fields[section].map(([key, label, type]) => (
                <Field
                  key={key}
                  label={label}
                  value={draft[key]}
                  type={type || 'text'}
                  onChange={(v) => setDraft({ ...draft, [key]: v })}
                />
              ))}

              {section === 'home' && (
                <Field
                  label="Featured activities"
                  value={(draft.featured || []).join(', ')}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      featured: v.split(',').map((s) => s.trim()),
                    })
                  }
                  help="Separate activity names with commas"
                />
              )}

              {section === 'about' && (
                <div className="subsection">
                  <h3>Instructor profiles</h3>
                  <p>
                    Profiles can be entered after names, biographies and photos are approved.
                  </p>
                  <Button
                    variant="secondary"
                    icon={Plus}
                    onClick={() =>
                      setDraft({
                        ...draft,
                        team: [
                          ...(draft.team || []),
                          { name: '', role: '', bio: '' },
                        ],
                      })
                    }
                  >
                    Add person
                  </Button>

                  {(draft.team || []).map((person: any, i: number) => (
                    <div className="team-row" key={i}>
                      <Field
                        label="Name"
                        value={person.name}
                        onChange={(v) =>
                          setDraft({
                            ...draft,
                            team: draft.team.map((p: any, j: number) =>
                              j === i ? { ...p, name: v } : p
                            ),
                          })
                        }
                      />
                      <Field
                        label="Role"
                        value={person.role}
                        onChange={(v) =>
                          setDraft({
                            ...draft,
                            team: draft.team.map((p: any, j: number) =>
                              j === i ? { ...p, role: v } : p
                            ),
                          })
                        }
                      />
                      <Field
                        label="Bio"
                        value={person.bio}
                        type="textarea"
                        onChange={(v) =>
                          setDraft({
                            ...draft,
                            team: draft.team.map((p: any, j: number) =>
                              j === i ? { ...p, bio: v } : p
                            ),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'Media' && (
            <>
              <h2>Images and video</h2>
              <p className="muted">
                Paste an asset URL, or upload a file to the Media library and copy its link.
              </p>
              {mediaFields[section].map(([key, label]) => (
                <Field
                  key={key}
                  label={label}
                  value={draft[key]}
                  onChange={(v) => setDraft({ ...draft, [key]: v })}
                />
              ))}
              <p className="footnote">
                For the live product, media should be stored in managed file storage with automatic
                optimization.
              </p>
            </>
          )}

          {tab === 'SEO' && (
            <>
              <h2>Search appearance</h2>
              <p className="muted">
                Preview how the page will appear in search results.
              </p>
              <Field
                label="SEO title"
                value={draft.seoTitle || ''}
                onChange={(v) => setDraft({ ...draft, seoTitle: v })}
                placeholder="Mind DetoxX — ..."
              />
              <Field
                label="Meta description"
                value={draft.seoDescription || ''}
                type="textarea"
                onChange={(v) => setDraft({ ...draft, seoDescription: v })}
              />
              <div className="search-preview">
                <span>mind-detoxx.vercel.app / {section}</span>
                <b>{draft.seoTitle || draft.title || draft.heroTitle}</b>
                <p>{draft.seoDescription || draft.intro || draft.heroSubtitle}</p>
              </div>
            </>
          )}
        </div>

        <div className="editor-preview">
          <div className="preview-bar">
            <span>
              <Eye size={15} /> LIVE PAGE PREVIEW
            </span>
            <span>Desktop</span>
          </div>
          <div className="preview-window">
            <div className="mock-nav">
              <b>✺ MIND DETOXX</b>
              <span>Home &nbsp; About &nbsp; Activities &nbsp; Schedule</span>
              <i>Book now</i>
            </div>
            <div
              className="mock-hero"
              style={
                heroBackground
                  ? {
                      backgroundImage: `linear-gradient(#041418bb,#041418ef),url(${heroBackground})`,
                    }
                  : {}
              }
            >
              <span>{section === 'home' ? draft.heroEyebrow : 'MIND DETOXX STUDIO'}</span>
              <h2>{draft.heroTitle || draft.title}</h2>
              <p>{draft.heroSubtitle || draft.intro || draft.story}</p>
              <button type="button">{draft.primaryCTA || 'Explore more'}</button>
            </div>
            <div className="mock-after">
              <b>{draft.introTitle || 'Breathe · Move · Heal · Grow · Repeat'}</b>
              <span>{draft.introBody || draft.amenities || draft.values}</span>
            </div>
          </div>
          <p className="preview-note">
            A visual approximation for admin review. Public site styling remains on the existing
            Vercel website.
          </p>
        </div>
      </div>

      {preview && (
        <Modal
          title="Public page preview"
          subtitle="This is a demonstration preview of your unsaved changes."
          onClose={() => setPreview(false)}
          wide
        >
          <div className="large-preview">
            <div
              className="mock-hero"
              style={
                heroBackground
                  ? {
                      backgroundImage: `linear-gradient(#041418bb,#041418ef),url(${heroBackground})`,
                    }
                  : {}
              }
            >
              <span>{draft.heroEyebrow || 'MIND DETOXX'}</span>
              <h2>{draft.heroTitle || draft.title}</h2>
              <p>{draft.heroSubtitle || draft.intro || draft.story}</p>
            </div>
            <div className="mock-after">
              <b>{draft.introTitle || draft.values}</b>
              <span>{draft.introBody || draft.amenities}</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ContentEditor;
