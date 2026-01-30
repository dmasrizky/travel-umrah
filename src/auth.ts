import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; // We need zod, checking if installed or standard
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function getUser(username: string) {
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
export const { auth, signIn, signOut, handlers } = NextAuth({
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                // @ts-ignore // Ignore type error for now until next-auth.d.ts is set
                session.user.role = token.role;
            }
            return session;
        },
    },
    // secret: process.env.AUTH_SECRET, // Should be picked up from env now, but leaving as fallback if needed.
    // actually let's revert to standard behavior now that env is fixed. 
    // But to be safe on vercel, explicit secret is often good. 
    // I will just remove the console log.
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log("Authorize called with:", credentials?.username);
                const parsedCredentials = z
                    .object({ username: z.string().min(1), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const user = await getUser(username);
                    if (!user) {
                        console.log("User not found for username:", username);
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        console.log("Password match! returning user.");
                        return user;
                    }
                    console.log("Password mismatch for username:", username);
                } else {
                    console.log("Zod validation failed:", parsedCredentials.error);
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
