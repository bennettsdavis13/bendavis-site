import { cookies } from 'next/headers';
import { verifySession, COOKIE_NAME } from '@/lib/auth';
import { getContent } from '@/lib/content';
import { getLatestContent } from '@/lib/github';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  if (!verifySession(cookies().get(COOKIE_NAME)?.value)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  let content;
  try { content = await getLatestContent(); }
  catch { content = await getContent(); }
  return Response.json({ ok: true, content });
}
