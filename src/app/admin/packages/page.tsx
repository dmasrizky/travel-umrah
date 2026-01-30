import PackageTable from '@/components/admin/PackageTable';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FlashToastHandler } from '@/components/admin/FlashToastHandler';

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const formattedPackages = packages.map((pkg) => ({
      ...pkg,
      price: Number(pkg.price)
  }));

  return (
    <>
    <FlashToastHandler />
    <div className="w-full space-y-4">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Packages</h2>
        <Button asChild>
          <Link href="/admin/packages/new">
            <Plus className="mr-2 h-4 w-4" /> Create Package
          </Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
         {/* @ts-ignore */}
         <PackageTable packages={formattedPackages} />
      </Suspense>
    </div>
    </>
  );
}
