"use client"

import Link from 'next/link';
import { Package } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Package as PackageIcon, Plus } from "lucide-react"
import { DeleteButton } from "@/components/admin/DeleteButton"
import { deletePackage } from "@/app/admin/actions"

export default function PackageTable({ packages }: { packages: Package[] }) {
  if (packages.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <PackageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Belum Ada Paket</h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-4">
            Mulai dengan membuat paket ibadah pertama untuk ditampilkan di website.
          </p>
          <Button asChild>
            <Link href="/admin/packages/new">
              <Plus className="mr-2 h-4 w-4" /> Buat Paket Baru
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{pkg.title}</TableCell>
              <TableCell>
                 <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        pkg.type === 'HAJI' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {pkg.type}
                    </span>
              </TableCell>
              <TableCell>Rp {Number(pkg.price).toLocaleString('id-ID')}</TableCell>
              <TableCell>
                  {pkg.isFeatured ? (
                     <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Featured</span>
                  ) : '-'}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/packages/${pkg.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <DeleteButton id={pkg.id} action={deletePackage} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

