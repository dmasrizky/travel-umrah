import PackageForm from '@/components/admin/PackageForm';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();
 
export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pkg = await prisma.package.findUnique({
        where: { id },
    });

    if (!pkg) {
        notFound();
    }

  return (
    <main>
      <h1 className="text-2xl font-heading font-bold mb-6">Edit Package</h1>
      <PackageForm pkg={{
        ...pkg,
        price: pkg.price.toNumber(),
      } as any} />
    </main>
  );
}
