
'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { UserRole } from '@/lib/types';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required.'),
    password: z.string().min(1, 'Password is required.'),
    role: z.enum(['citizen', 'admin', 'official']),
});


export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your inputs.' };
  }

  const { username, password, role } = validatedFields.data;

  // Handle hardcoded admin user
  if (role === 'admin' && username === 'admin@civicconnect') {
    if (password === 'civicconnectadmin') {
      const session = await getSession();
      session.user = {
        id: 'admin_user',
        username: 'Admin',
        email: 'admin@civicconnect.com',
        role: 'admin',
      };
      session.isLoggedIn = true;
      await session.save();
      redirect('/dashboard');
    } else {
      return { error: 'Invalid username or password.' };
    }
  }


  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return { error: 'Invalid username or password.' };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return { error: 'Invalid username or password.' };
    }
    
    // Check if the selected role on the form matches the role in the database
    if (user.role !== role) {
      return { error: `Invalid credentials for the selected '${role}' role.` };
    }
    
    const userRole: UserRole = user.role;

    const session = await getSession();
    session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: userRole,
      department: user.department,
    };
    session.isLoggedIn = true;
    await session.save();

  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }

  redirect('/dashboard');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/');
}
