import local from '@/data/content.json';

// Public pages read the content that was bundled at build time. Because every
// save commits to GitHub and triggers a fresh Vercel deploy, this bundled copy
// is always the latest after a deploy, with no CDN-cache staleness.
export async function getContent() { return local; }
export function getContentSync() { return local; }
