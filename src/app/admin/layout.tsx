import { Sidebar, MobileSidebar } from '@/components/admin/Sidebar';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { auth } from '@/auth'; // Impor auth
import { LoadingProvider } from '@/context/LoadingContext';
import GlobalLoader from '@/components/admin/GlobalLoader';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = session?.user?.role;

  // Apply admin-theme class to separate styles from landing page
  return (
    <LoadingProvider>
        <GlobalLoader />
        <div className={cn("min-h-screen bg-background font-sans antialiased admin-theme")}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <span className="font-semibold text-lg">Admin Panel</span>
                </div>
                <div className="flex-1">
                <Sidebar className="w-full" role={role} />
                </div>
            </div>
            </div>
            <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
                <MobileSidebar role={role} />
                <div className="w-full flex-1">
                    <span className="font-semibold">An Nur Travel</span>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
            </div>
        </div>
        <Toaster />
        </div>
    </LoadingProvider>
    
  );
}

