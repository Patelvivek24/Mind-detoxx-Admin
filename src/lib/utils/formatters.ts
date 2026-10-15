export const fmt = (n: string | number | null | undefined): string => {
  if (n === '' || n == null) return 'To confirm';
  const num = Number(n);
  if (isNaN(num)) return 'To confirm';
  return '₹' + num.toLocaleString('en-IN');
};

export const dateLabel = (s: string): string => {
  if (!s) return '';
  return new Date(s + 'T12:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const iso = (d: Date): string => {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export const uid = (prefix: string): string => {
  return prefix + Math.random().toString(36).slice(2, 8);
};

export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const REFERENCE_NOW = new Date(2026, 8, 29);
