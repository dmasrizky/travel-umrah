'use client';

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useState } from "react" // Added

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { createGalleryItem } from "@/app/admin/actions"
import ImageUpload from "@/components/admin/ImageUpload" // Added
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
import { useRef } from "react";

export default function NewGalleryPage() {
  const [imageUrl, setImageUrl] = useState("");
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
        <Link href="/admin/gallery">
            <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
            </Button>
        </Link>
        <h1 className="text-lg font-semibold md:text-2xl">Add New Image</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Image Details</CardTitle>
              <CardDescription>
                Add a new image to your gallery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                ref={formRef}
                action={createGalleryItem} 
                onSubmit={() => setLoading(true)}
                className="grid gap-6"
              >
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    className="w-full"
                    placeholder="e.g. Masjidil Haram View"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Image</Label>
                  <ImageUpload 
                    value={imageUrl} 
                    onChange={setImageUrl} 
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masjidil Haram">Masjidil Haram</SelectItem>
                        <SelectItem value="Masjid Nabawi">Masjid Nabawi</SelectItem>
                        <SelectItem value="Hotel">Hotel</SelectItem>
                        <SelectItem value="Activity">Activity</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <Button type="button" onClick={() => setShowConfirm(true)}>Save Image</Button>
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
