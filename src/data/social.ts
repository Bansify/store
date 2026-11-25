/**
 * The Bansify social accounts, with their real brand marks as inline SVG paths so the card
 * needs neither an icon font nor a network request.
 */
export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  color: string;
  path: string;
}

const P = {
  facebook:
    'M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5v7h3z',
  instagram:
    'M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zM17 6.2a1.1 1.1 0 1 0 1.1 1.1A1.1 1.1 0 0 0 17 6.2zM12 4.6c1.9 0 2.2 0 3 .1a4 4 0 0 1 1.5.3 2.7 2.7 0 0 1 1.5 1.5 4 4 0 0 1 .3 1.5c0 .8.1 1.1.1 3s0 2.2-.1 3a4 4 0 0 1-.3 1.5 2.7 2.7 0 0 1-1.5 1.5 4 4 0 0 1-1.5.3c-.8 0-1.1.1-3 .1s-2.2 0-3-.1a4 4 0 0 1-1.5-.3 2.7 2.7 0 0 1-1.5-1.5 4 4 0 0 1-.3-1.5c0-.8-.1-1.1-.1-3s0-2.2.1-3a4 4 0 0 1 .3-1.5A2.7 2.7 0 0 1 7.5 5a4 4 0 0 1 1.5-.3c.8-.1 1.1-.1 3-.1z',
  youtube:
    'M21.6 8.2a2.5 2.5 0 0 0-1.8-1.8C18.2 6 12 6 12 6s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.8 1.8C5.8 18 12 18 12 18s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-3.8zM10 15V9l5.2 3z',
  x: 'M17.5 4h2.9l-6.3 7.2L21.5 20h-5.8l-4.5-5.9L5.9 20H3l6.7-7.7L2.9 4h5.9l4.1 5.4zm-1 14.2h1.6L7.6 5.7H5.9z',
  linkedin:
    'M6.9 8.6H4V20h2.9zM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 13.6c0-3.2-1.7-4.7-4-4.7a3.4 3.4 0 0 0-3.1 1.7V8.6H10V20h2.9v-6a2 2 0 0 1 1.9-2.2c1.1 0 1.8.7 1.8 2.2v6H20z',
  telegram:
    'M21.9 4.3 19 19.2c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7.6 13.3 3.2 12c-1-.3-1-1 .2-1.4l17-6.6c.8-.3 1.5.2 1.5 1.3z',
  github:
    'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', handle: '@bansifyofficial', url: 'https://facebook.com/bansifyofficial', color: '#1877F2', path: P.facebook },
  { id: 'instagram', label: 'Instagram', handle: '@bansifyofficial', url: 'https://instagram.com/bansifyofficial', color: '#E1306C', path: P.instagram },
  { id: 'youtube', label: 'YouTube', handle: '@bansifyofficial', url: 'https://youtube.com/@bansifyofficial', color: '#FF0000', path: P.youtube },
  { id: 'x', label: 'X', handle: '@bansifyofficial', url: 'https://x.com/bansifyofficial', color: '#0F1419', path: P.x },
  { id: 'linkedin', label: 'LinkedIn', handle: '@bansifyofficial', url: 'https://linkedin.com/company/bansifyofficial', color: '#0A66C2', path: P.linkedin },
  { id: 'telegram', label: 'Telegram', handle: '@bansifyofficial', url: 'https://t.me/bansifyofficial', color: '#229ED9', path: P.telegram },
  { id: 'github', label: 'GitHub', handle: '@Bansify', url: 'https://github.com/Bansify', color: '#181717', path: P.github },
];
