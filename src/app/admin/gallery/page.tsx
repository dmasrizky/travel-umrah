import Link from "next/link"
import { PlusCircle, Pencil } from "lucide-react"

import { DeleteButton } from "@/components/admin/DeleteButton"
import { deleteGalleryItem } from "@/app/admin/actions"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "@/lib/prisma"
import { FlashToastHandler } from "@/components/admin/FlashToastHandler"

export default async function GalleryPage() {
  const galleryItems = await prisma.gallery.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <>
    <FlashToastHandler />
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Image
          </Link>
        </Button>
      </div>
      <div className="rounded-md border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created At
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt={item.title}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={item.imageUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    {item.category || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        {/* Edit Button - To be implemented */}
                        {/* <Link href={`/admin/gallery/${item.id}`}>
                          <Button size="icon" variant="ghost">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link> */}
                        <DeleteButton id={item.id} action={deleteGalleryItem} />
                     </div>
                  </TableCell>
                </TableRow>
              ))}
              {galleryItems.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No images found.
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
      </div>
    </div>
    </>
  )
}
