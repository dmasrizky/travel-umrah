"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Image as ImageIcon, MessageSquareQuote, LogOut, Menu, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SignOutButton from "@/components/admin/SignOutButton" // Assuming this exists or will be adapted

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Packages",
    href: "/admin/packages",
    icon: Package,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: string;
}

export function Sidebar({ className, role }: SidebarProps) {
  const pathname = usePathname()

  const filteredLinks = sidebarLinks.concat(
    role === 'SUPER_ADMIN' ? [{
      title: "Users Management",
      href: "/admin/users",
      icon: Users,
    }] : []
  );

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
                <div className="px-3 py-2">
          <div className="space-y-1">
            {filteredLinks.map((link) => (
              <Button
                key={link.href}
                variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
         <div className="space-y-1">
             {/* Integrating existing SignOutButton logic if needed, or just a button */}
             <div className="px-4">
                <SignOutButton />
             </div>
         </div>
      </div>
    </div>
  )
}

export function MobileSidebar({ role }: { role?: string }) {
    const pathname = usePathname()
    const [open, setOpen] = React.useState(false)

    // Close sidebar when path changes (navigation)
    React.useEffect(() => {
        setOpen(false)
    }, [pathname])

    const filteredLinks = sidebarLinks.concat(
      role === 'SUPER_ADMIN' ? [{
        title: "Users Management",
        href: "/admin/users",
        icon: Users,
      }] : []
    );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7 text-lg font-bold text-primary">
            An Nur Admin
        </div>
        <div className="py-4">
            <div className="space-y-1">
                {filteredLinks.map((link) => (
                <Button
                    key={link.href}
                    variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                >
                    <Link href={link.href}>
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.title}
                    </Link>
                </Button>
                ))}
            </div>
            <div className="mt-4 px-2">
                <SignOutButton /> 
            </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
