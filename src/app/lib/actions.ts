'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        console.log("Calling signIn credentials...");
        await signIn('credentials', formData, { redirectTo: '/admin/dashboard' });
    } catch (error) {
        if (error instanceof AuthError) {
            console.log("AuthError caught:", error.type);
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

const PackageSchema = z.object({
    title: z.string().min(1),
    type: z.enum(['HAJI', 'UMRAH']),
    price: z.coerce.number().min(0),
    duration: z.coerce.number().min(1),
    description: z.string().min(1),
    amenities: z.string().transform((str) => str.split(',').map((s) => s.trim())),
    imageUrl: z.string().optional(),
    isFeatured: z.coerce.boolean().optional(),
    departureDate: z.string().optional(),
    hotelMakkah: z.string().optional(),
    hotelMakkahRating: z.coerce.number().min(0).max(5).optional(),
    hotelMadinah: z.string().optional(),
    hotelMadinahRating: z.coerce.number().min(0).max(5).optional(),
    airline: z.string().optional(),
    priceExcludes: z.string().transform((str) => str.split(',').map((s) => s.trim())),
    generalEquipment: z.string().optional().transform((str) => str ? str.split(',').map((s) => s.trim()) : []),
    menEquipment: z.string().optional().transform((str) => str ? str.split(',').map((s) => s.trim()) : []),
    womenEquipment: z.string().optional().transform((str) => str ? str.split(',').map((s) => s.trim()) : []),
});

export async function createPackage(prevState: any, formData: FormData) {
    const validatedFields = PackageSchema.safeParse({
        title: formData.get('title'),
        type: formData.get('type'),
        price: formData.get('price'),
        duration: formData.get('duration'),
        description: formData.get('description'),
        amenities: formData.get('amenities'),
        imageUrl: formData.get('imageUrl'),
        isFeatured: formData.get('isFeatured') === 'on',
        departureDate: formData.get('departureDate'),
        hotelMakkah: formData.get('hotelMakkah'),
        hotelMakkahRating: formData.get('hotelMakkahRating'),
        hotelMadinah: formData.get('hotelMadinah'),
        hotelMadinahRating: formData.get('hotelMadinahRating'),
        airline: formData.get('airline'),
        priceExcludes: formData.get('priceExcludes'),
        generalEquipment: formData.get('generalEquipment'),
        menEquipment: formData.get('menEquipment'),
        womenEquipment: formData.get('womenEquipment'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Package.',
        };
    }

    const {
        title, type, price, duration, description, amenities, imageUrl, isFeatured,
        departureDate, hotelMakkah, hotelMadinah, airline,
        hotelMakkahRating, hotelMadinahRating, priceExcludes,
        generalEquipment, menEquipment, womenEquipment
    } = validatedFields.data;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    try {
        await prisma.package.create({
            data: {
                title,
                slug,
                type: type as 'HAJI' | 'UMRAH',
                price,
                duration,
                description,
                amenities,
                priceExcludes,
                generalEquipment,
                menEquipment,
                womenEquipment,
                imageUrl,
                isFeatured: isFeatured || false,
                departureDate,
                hotelMakkah,
                hotelMadinah,
                airline,
                hotelMakkahRating: hotelMakkahRating || 0,
                hotelMadinahRating: hotelMadinahRating || 0,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Package.',
        };
    }

    revalidatePath('/admin/packages');
    redirect('/admin/packages?toast_success=Paket%20berhasil%20dibuat');
}

export async function updatePackage(id: string, prevState: any, formData: FormData) {
    const validatedFields = PackageSchema.safeParse({
        title: formData.get('title'),
        type: formData.get('type'),
        price: formData.get('price'),
        duration: formData.get('duration'),
        description: formData.get('description'),
        amenities: formData.get('amenities'),
        imageUrl: formData.get('imageUrl'),
        isFeatured: formData.get('isFeatured') === 'on',
        departureDate: formData.get('departureDate'),
        hotelMakkah: formData.get('hotelMakkah'),
        hotelMakkahRating: formData.get('hotelMakkahRating'),
        hotelMadinah: formData.get('hotelMadinah'),
        hotelMadinahRating: formData.get('hotelMadinahRating'),
        airline: formData.get('airline'),
        priceExcludes: formData.get('priceExcludes'),
        generalEquipment: formData.get('generalEquipment'),
        menEquipment: formData.get('menEquipment'),
        womenEquipment: formData.get('womenEquipment'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Package.',
        };
    }

    const {
        title, type, price, duration, description, amenities, imageUrl, isFeatured,
        departureDate, hotelMakkah, hotelMadinah, airline,
        hotelMakkahRating, hotelMadinahRating, priceExcludes,
        generalEquipment, menEquipment, womenEquipment
    } = validatedFields.data;

    try {
        await prisma.package.update({
            where: { id },
            data: {
                title,
                type: type as 'HAJI' | 'UMRAH',
                price,
                duration,
                description,
                amenities,
                priceExcludes,
                generalEquipment,
                menEquipment,
                womenEquipment,
                imageUrl,
                isFeatured: isFeatured || false,
                departureDate,
                hotelMakkah,
                hotelMadinah,
                airline,
                hotelMakkahRating: hotelMakkahRating || 0,
                hotelMadinahRating: hotelMadinahRating || 0,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Package.',
        };
    }

    revalidatePath('/admin/packages');
    redirect('/admin/packages?toast_success=Paket%20berhasil%20diperbarui');
}


export async function deletePackage(id: string) {
    try {
        await prisma.package.delete({
            where: { id },
        });
        revalidatePath('/admin/packages');
    } catch (error) {
        console.error('Failed to delete package:', error);
    }
}

// User Actions
const UserSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).optional(), // Optional for update
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'USER']),
});

export async function createUser(prevState: any, formData: FormData) {
    const validatedFields = UserSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        };
    }

    const { username, email, password, role } = validatedFields.data;

    if (!password) {
        return { message: 'Password is required for new users.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: role as 'SUPER_ADMIN' | 'ADMIN' | 'USER',
            },
        });
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create User. Username or Email might be taken.',
        };
    }

    revalidatePath('/admin/users');
    redirect('/admin/users?toast_success=User%20berhasil%20dibuat');
}

export async function updateUser(id: string, prevState: any, formData: FormData) {
    const validatedFields = UserSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password') || undefined, // Send undefined if empty to skip update
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update User.',
        };
    }

    const { username, email, password, role } = validatedFields.data;

    const dataToUpdate: any = {
        username,
        email,
        role: role as 'SUPER_ADMIN' | 'ADMIN' | 'USER',
    };

    if (password) {
        dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    try {
        await prisma.user.update({
            where: { id },
            data: dataToUpdate,
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update User.',
        };
    }

    revalidatePath('/admin/users');
    redirect('/admin/users?toast_success=User%20berhasil%20diperbarui');
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id },
        });
        revalidatePath('/admin/users');
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
}
