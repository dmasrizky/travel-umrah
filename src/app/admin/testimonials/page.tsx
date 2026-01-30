import Link from "next/link"
import { PlusCircle, Trash2, Pencil } from "lucide-react"

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
import { DeleteButton } from "@/components/admin/DeleteButton"
import { deleteTestimonial } from "@/app/admin/actions"
import { FlashToastHandler } from "@/components/admin/FlashToastHandler"

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <>
    <FlashToastHandler />
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
          </Link>
        </Button>
      </div>
      <div className="rounded-md border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Avatar
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">
                    Content
                </TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="hidden sm:table-cell">
                     {item.avatarUrl ? (
                        <img
                        alt={item.name}
                        className="aspect-square rounded-full object-cover"
                        height="40"
                        src={item.avatarUrl}
                        width="40"
                        />
                     ) : (
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs font-bold">{item.name.charAt(0)}</span>
                        </div>
                     )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    {item.role || "-"}
                  </TableCell>
                   <TableCell className="hidden md:table-cell max-w-xs truncate">
                    {item.content}
                  </TableCell>
                  <TableCell>
                    {item.rating}/5
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        {/* Edit and Delete to be implemented */}
                        <DeleteButton id={item.id} action={deleteTestimonial} />
                     </div>
                  </TableCell>
                </TableRow>
              ))}
              {testimonials.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No testimonials found.
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
