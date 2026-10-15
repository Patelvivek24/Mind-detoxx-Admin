export type Role = 'Super Admin' | 'Staff';

export type VisibilityStatus = 'Published' | 'Draft' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'Unpaid' | 'Refunded';
export type BookingStatus = 'Confirmed' | 'Awaiting payment' | 'Enquiry' | 'Cancelled';
export type EnquiryStatus = 'New' | 'Contacted' | 'Resolved';
export type SessionStatus = 'Scheduled' | 'Cancelled';
export type ActivityCategory = 'Movement' | 'Healing' | 'Stillness' | 'Guidance';
export type ActivityMode = 'Class' | 'Course' | 'Appointment' | 'Event only' | 'Enquiry';
export type PlanType = 'Monthly' | 'Group' | 'Drop-in' | 'Quarterly';
export type BookingType = 'Single class' | 'Monthly' | 'Group' | 'Event' | 'Rental';
export type EnquiryType = 'Activity' | 'Membership' | 'Event' | 'Rental' | 'General';

export interface HomeContent {
  status: 'Published' | 'Draft';
  heroTitle: string;
  heroSubtitle: string;
  heroEyebrow: string;
  heroMedia: string;
  heroPoster: string;
  introTitle: string;
  introBody: string;
  primaryCTA: string;
  secondaryCTA: string;
  featured: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface AboutContent {
  status: 'Published' | 'Draft';
  title: string;
  story: string;
  values: string;
  studioAddress: string;
  founderName: string;
  founderBio: string;
  studioImage: string;
  team: TeamMember[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface RentalContent {
  status: 'Published' | 'Draft';
  title: string;
  intro: string;
  heroMedia: string;
  amenities: string;
  terms: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface RetreatsContent {
  status: 'Published' | 'Draft';
  title: string;
  intro: string;
  heroMedia: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SEOContent {
  siteTitle: string;
  description: string;
}

export interface StudioContentCollection {
  home: HomeContent;
  about: AboutContent;
  rental: RentalContent;
  retreats: RetreatsContent;
  seo: SEOContent;
}

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  duration: number;
  price: string | number;
  mode: ActivityMode;
  status: VisibilityStatus;
  image: string;
  video: string;
  description: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string | number;
  period: string;
  type: PlanType;
  sessions: string;
  status: VisibilityStatus;
  description: string;
}

export interface Session {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: number;
  activity: string;
  instructor: string;
  capacity: number;
  status: SessionStatus;
}

export interface Booking {
  id: string;
  customer: string;
  phone: string;
  kind: BookingType;
  item: string;
  date: string;
  amount: string | number;
  payment: PaymentStatus;
  status: BookingStatus;
  source: 'Website' | 'Admin';
  sessionId?: string;
  planId?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  price: string | number;
  status: VisibilityStatus;
  description: string;
  image: string;
}

export interface StudioRental {
  id: string;
  customer: string;
  phone: string;
  date: string;
  start: string;
  end: string;
  purpose: string;
  amount: string | number;
  status: 'Enquiry' | 'Pending' | 'Confirmed' | 'Cancelled';
  payment: PaymentStatus;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  type: EnquiryType;
  interest: string;
  date: string;
  status: EnquiryStatus;
  note: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: string;
  data: string;
}

export interface StudioSettings {
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  currency: string;
  gateway: string;
  bookingMode: string;
}

export interface AuditEntry {
  at: string;
  actor: Role;
  action: string;
  entity: string;
}

export interface StudioDB {
  role: Role;
  content: StudioContentCollection;
  activities: Activity[];
  plans: MembershipPlan[];
  sessions: Session[];
  bookings: Booking[];
  events: EventItem[];
  rentals: StudioRental[];
  enquiries: Enquiry[];
  media: MediaItem[];
  settings: StudioSettings;
  audit: AuditEntry[];
}

export type EntityKind = 'activity' | 'session' | 'recurring' | 'plan' | 'booking' | 'event' | 'rental' | 'enquiry';
