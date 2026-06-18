import local from '@/data/content.json';

const OWNER = process.env.GITHUB_OWNER || 'TobiasBoscoBrown';
const REPO = process.env.GITHUB_REPO || 'bendavis-site';
const BRANCH = process.env.GITHUB_BRANCH || 'main';

// Read the live content straight from the GitHub API (not the raw CDN, which is
// cached ~5 min). This reflects edits immediately, including newly added blocks.
// Falls back to the bundled copy if the API is unavailable.
export async function getContent() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return local;
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/data/content.json?ref=${BRANCH}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.raw+json', 'X-GitHub-Api-Version': '2022-11-28' }, cache: 'no-store' }
    );
    if (res.ok) { const data = await res.json(); if (data && data.site) return data; }
  } catch (e) { /* fall through */ }
  return local;
}
export function getContentSync() { return local; }
