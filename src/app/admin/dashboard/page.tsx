import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Users, Image as ImageIcon, Plus, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await auth();

  const [packageCount, galleryCount, testimonialCount, userCount, recentPackages] = await Promise.all([
    prisma.package.count(),
    prisma.gallery.count(),
    prisma.testimonial.count(),
    prisma.user.count(),
    prisma.package.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        type: true,
        price: true,
        createdAt: true,
      }
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat datang, <span className="font-medium text-foreground">{session?.user?.name || 'Admin'}</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paket Ibadah
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packageCount}</div>
            <div className="mt-3">
              <Button size="sm" variant="outline" asChild className="w-full">
                <Link href="/admin/packages/new">
                  <Plus className="mr-2 h-3 w-3" /> Tambah Paket
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Foto Galeri
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryCount}</div>
            <div className="mt-3">
              <Button size="sm" variant="outline" asChild className="w-full">
                <Link href="/admin/gallery/new">
                  <Plus className="mr-2 h-3 w-3" /> Upload Foto
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Testimoni
            </CardTitle>
            <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonialCount}</div>
            <div className="mt-3">
              <Button size="sm" variant="outline" asChild className="w-full">
                <Link href="/admin/testimonials/new">
                  <Plus className="mr-2 h-3 w-3" /> Tambah Testimoni
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {session?.user?.role === 'SUPER_ADMIN' && (
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCount}</div>
              <div className="mt-3">
                <Button size="sm" variant="outline" asChild className="w-full">
                  <Link href="/admin/users">
                    <ArrowRight className="mr-2 h-3 w-3" /> Kelola Users
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Packages */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Paket Terbaru</CardTitle>
            <CardDescription>Daftar paket ibadah yang baru ditambahkan</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/packages">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentPackages.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">Belum ada paket ibadah</p>
              <Button asChild>
                <Link href="/admin/packages/new">
                  <Plus className="mr-2 h-4 w-4" /> Buat Paket Pertama
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPackages.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{pkg.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        pkg.type === 'HAJI' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {pkg.type}
                      </span>
                      <span>Rp {Number(pkg.price).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/packages/${pkg.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

