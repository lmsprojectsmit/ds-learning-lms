import type { UserProfile } from '../types/lms';

export interface LMSHistoryState {
  lms: boolean;
  page: string;
  topicId?: string;
  step: number;
}

export function parseLocation(): { page: string; topicId?: string } | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#/') return null;

  const clean = hash.replace(/^#\/?/, '');
  const [pathPart, queryPart] = clean.split('?');

  if (pathPart === 'login' || pathPart === 'register') {
    return { page: pathPart };
  }

  let topicId: string | undefined;
  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    const t = params.get('topic');
    if (t) topicId = t;
  }

  const validPages = [
    'landing',
    'login',
    'register',
    'student-dashboard',
    'teacher-dashboard',
    'admin-dashboard',
    'c-fundamentals',
    'ds-hub',
    'ds-studio',
    'progress-history'
  ];

  if (validPages.includes(pathPart)) {
    return { page: pathPart, topicId };
  }
  return null;
}

export function getHashForPage(page: string, topicId?: string): string {
  if (page === 'landing') return '#/landing';
  if (page === 'login') return '#/login';
  if (page === 'register') return '#/register';
  if (page === 'ds-studio' && topicId) return `#/ds-studio?topic=${encodeURIComponent(topicId)}`;
  return `#/${page}`;
}

export function getDefaultPreviousPage(page: string, user: UserProfile | null): string {
  const root = user 
    ? (user.role === 'admin' ? 'admin-dashboard' : user.role === 'teacher' ? 'teacher-dashboard' : 'student-dashboard')
    : 'landing';

  switch (page) {
    case 'ds-studio':
      return 'ds-hub';
    case 'ds-hub':
    case 'c-fundamentals':
    case 'progress-history':
      return root;
    case 'login':
    case 'register':
      return user ? root : 'landing';
    case 'admin-dashboard':
    case 'teacher-dashboard':
      return 'student-dashboard';
    case 'student-dashboard':
      return user?.role === 'admin' ? 'admin-dashboard' : user?.role === 'teacher' ? 'teacher-dashboard' : 'landing';
    case 'landing':
    default:
      return root;
  }
}
