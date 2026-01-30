"use client";

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { createTestimonial } from "@/app/admin/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useLoading } from "@/context/LoadingContext";
import { useRef, useState } from "react";

export default function NewTestimonialPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { setLoading } = useLoading();

  const handleConfirm = () => {
    setShowConfirm(false);
    if (formRef.current) {
        formRef.current.requestSubmit();
    }
  };

  return (
    <>
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials">
            <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
            </Button>
        </Link>
        <h1 className="text-lg font-semibold md:text-2xl">Add New Testimonial</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Testimonial Details</CardTitle>
              <CardDescription>
                Add a new testimonial from a jamaah.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                ref={formRef}
                action={createTestimonial}
                onSubmit={() => setLoading(true)}
                className="grid gap-6"
              >
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full"
                    placeholder="e.g. Ahmad Fulan"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role / Group</Label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    className="w-full"
                    placeholder="e.g. Jamaah Umrah Ramadhan 2024"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    className="min-h-[100px]"
                    placeholder="Write the testimonial here..."
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="rating">Rating</Label>
                   <Select name="rating" defaultValue="5">
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="avatarUrl">Avatar URL (Optional)</Label>
                  <Input
                    id="avatarUrl"
                    name="avatarUrl"
                    type="text"
                    className="w-full"
                    placeholder="https://..."
                  />
                </div>
                <Button type="button" onClick={() => setShowConfirm(true)}>Save Testimonial</Button>
              </form>
            </CardContent>
          </Card>
      </div>
    </div>

    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Simpan</AlertDialogTitle>
            <AlertDialogDescription>
            Apakah Anda yakin ingin menyimpan data ini? Pastikan semua data sudah benar.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
            Simpan
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
