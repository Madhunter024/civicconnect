import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { User } from './types';

export const sessionOptions = {
  cookieName: 'citizengage_session',
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long_for_dev',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export interface SessionData {
  isLoggedIn: boolean;
  user?: User;
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
}
