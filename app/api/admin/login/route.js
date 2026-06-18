import { cookies } from 'next/headers';
import { checkPassword, signSession, COOKIE_NAME } from '@/lib/auth';
export const runtime = 'nodejs';
export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch {}
  if (!checkPassword(String(body.password || ''))) {
    return Response.json({ ok: false, error: 'Wrong password' }, { status: 401 });
  }
  // session-only cookie: no maxAge, so it clears when the browser closes (login each session)
  cookies().set(COOKIE_NAME, signSession(), {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/',
  });
  return Response.json({ ok: true });
}
