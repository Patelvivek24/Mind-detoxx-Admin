import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  UsersRound,
  Sparkles,
  PartyPopper,
  Building2,
  MessageCircle,
  WalletCards,
  House,
  Info,
  Image as ImageIcon,
  Settings2,
  type LucideIcon,
} from 'lucide-react';

export interface NavItemDef {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  eyebrow: string;
}

export interface NavGroupDef {
  group: string;
  items: NavItemDef[];
}

export const navGroupsData: NavGroupDef[] = [
  {
    group: 'Overview',
    items: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
        title: 'Dashboard',
        description: 'Your studio at a glance',
        eyebrow: 'MIND DETOXX / DASHBOARD',
      },
      {
        key: 'schedule',
        label: 'Class calendar',
        href: '/schedule',
        icon: CalendarDays,
        title: 'Class calendar',
        description: 'Build recurring weeks and manage individual dates',
        eyebrow: 'MIND DETOXX / SCHEDULE',
      },
      {
        key: 'bookings',
        label: 'Bookings',
        href: '/bookings',
        icon: BookOpen,
        title: 'Bookings',
        description: 'Class, membership, event and rental requests',
        eyebrow: 'MIND DETOXX / BOOKINGS',
      },
      {
        key: 'plans',
        label: 'Plans & memberships',
        href: '/plans',
        icon: UsersRound,
        title: 'Plans & memberships',
        description: 'Manage drop-in and subscription offerings',
        eyebrow: 'MIND DETOXX / PLANS',
      },
    ],
  },
  {
    group: 'Manage',
    items: [
      {
        key: 'activities',
        label: 'Activities',
        href: '/activities',
        icon: Sparkles,
        title: 'Activities catalogue',
        description: 'The public catalogue of studio practices',
        eyebrow: 'MIND DETOXX / ACTIVITIES',
      },
      {
        key: 'events',
        label: 'Events & retreats',
        href: '/events',
        icon: PartyPopper,
        title: 'Events & retreats',
        description: 'Publish events and manage ticket capacity',
        eyebrow: 'MIND DETOXX / EVENTS',
      },
      {
        key: 'rentals',
        label: 'Studio rentals',
        href: '/rentals',
        icon: Building2,
        title: 'Studio rentals',
        description: 'Availability and studio rental enquiries',
        eyebrow: 'MIND DETOXX / RENTALS',
      },
      {
        key: 'enquiries',
        label: 'Enquiries',
        href: '/enquiries',
        icon: MessageCircle,
        title: 'Enquiries',
        description: 'All incoming requests in one place',
        eyebrow: 'MIND DETOXX / ENQUIRIES',
      },
      {
        key: 'payments',
        label: 'Payments',
        href: '/payments',
        icon: WalletCards,
        title: 'Payments',
        description: 'A demonstration ledger of payment status',
        eyebrow: 'MIND DETOXX / PAYMENTS',
      },
    ],
  },
  {
    group: 'Website content',
    items: [
      {
        key: 'home',
        label: 'Home page',
        href: '/content/home',
        icon: House,
        title: 'Home page',
        description: 'Edit the content visitors see on the home page',
        eyebrow: 'MIND DETOXX / CONTENT / HOME',
      },
      {
        key: 'about',
        label: 'About us',
        href: '/content/about',
        icon: Info,
        title: 'About us',
        description: 'Studio story, team and location',
        eyebrow: 'MIND DETOXX / CONTENT / ABOUT',
      },
      {
        key: 'retreatsContent',
        label: 'Retreats page',
        href: '/content/retreats',
        icon: PartyPopper,
        title: 'Retreats page',
        description: 'Introduction to retreats and workshops',
        eyebrow: 'MIND DETOXX / CONTENT / RETREATS',
      },
      {
        key: 'rentalContent',
        label: 'Rental page',
        href: '/content/rental',
        icon: Building2,
        title: 'Rental page',
        description: 'Rental page copy and facilities',
        eyebrow: 'MIND DETOXX / CONTENT / RENTAL',
      },
      {
        key: 'media',
        label: 'Media library',
        href: '/media',
        icon: ImageIcon,
        title: 'Media library',
        description: 'Upload images and video for public pages',
        eyebrow: 'MIND DETOXX / MEDIA',
      },
    ],
  },
  {
    group: 'System',
    items: [
      {
        key: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: Settings2,
        title: 'Settings',
        description: 'Contact details, publishing and access',
        eyebrow: 'MIND DETOXX / SETTINGS',
      },
    ],
  },
];
