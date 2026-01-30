'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Gallery Actions
export async function createGalleryItem(formData: FormData) {
    const title = formData.get("title") as string
    const imageUrl = formData.get("imageUrl") as string
    const category = formData.get("category") as string

    if (!title || !imageUrl) {
        throw new Error("Title and Image URL are required")
    }

    await prisma.gallery.create({
        data: {
            title,
            imageUrl,
            category,
        },
    })

    revalidatePath("/admin/gallery")
    redirect("/admin/gallery?toast_success=Gambar%20berhasil%20ditambahkan")
}

export async function deleteGalleryItem(id: string) {
    if (!id) return;

    await prisma.gallery.delete({
        where: { id }
    })

    revalidatePath("/admin/gallery")
}


// Testimonial Actions
export async function createTestimonial(formData: FormData) {
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const content = formData.get("content") as string
    const avatarUrl = formData.get("avatarUrl") as string
    const rating = parseInt(formData.get("rating") as string) || 5

    if (!name || !content) {
        throw new Error("Name and Content are required")
    }

    await prisma.testimonial.create({
        data: {
            name,
            role,
            content,
            avatarUrl,
            rating,
        },
    })

    revalidatePath("/admin/testimonials")
    redirect("/admin/testimonials?toast_success=Testimoni%20berhasil%20ditambahkan")
}

export async function deleteTestimonial(id: string) {
    if (!id) return;

    await prisma.testimonial.delete({
        where: { id }
    })

    revalidatePath("/admin/testimonials")
}


// Package Actions
export async function deletePackage(id: string) {
    if (!id) return;

    await prisma.package.delete({
        where: { id }
    })

    revalidatePath("/admin/packages")
}

export async function signOutAction() {
    const { signOut } = await import('@/auth')
    await signOut()
}
