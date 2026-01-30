import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdminPanel = nextUrl.pathname.startsWith('/admin');

            console.log(`Middleware check: Path=${nextUrl.pathname}, LoggedIn=${isLoggedIn}`);

            if (isOnAdminPanel) {
                if (isLoggedIn) {
                    console.log("User authorized for admin panel");
                    return true;
                }
                console.log("User NOT authorized for admin panel, redirecting to login");
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === '/login') {
                // Redirect logged-in users away from login page
                console.log("User already logged in on login page, redirecting to dashboard");
                return Response.redirect(new URL('/admin/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: process.env.AUTH_SECRET, // Add secret for Middleware support
} satisfies NextAuthConfig;
