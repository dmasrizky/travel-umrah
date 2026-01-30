'use client';
 
import { Package } from '@prisma/client';
import { createPackage, updatePackage } from '@/app/lib/actions';
import { useState, useActionState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { Button } from "@/components/ui/button"
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
import { Card, CardContent } from "@/components/ui/card"
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
import { useToast } from "@/hooks/use-toast";
import { useRef, useEffect } from "react";

// Define a type for our form state
interface State {
  errors?: {
    title?: string[];
    type?: string[];
    price?: string[];
    duration?: string[];
    description?: string[];
    amenities?: string[];
    imageUrl?: string[];
    isFeatured?: string[];
    departureDate?: string[];
    hotelMakkah?: string[];
    hotelMadinah?: string[];
    airline?: string[];
  };
  message: string;
  inputs?: any; // To preserve inputs on error
}

// Default values for new packages
const DEFAULT_UMRAH_EQUIPMENT = "koper bagasi, koper cabin, tas selempang, id card, buku memori, buku kalung do'a, buku manasik, kain batik travel";
const DEFAULT_HAJI_EQUIPMENT = "koper bagasi, koper cabin, tas selempang, id card, buku memori, buku kalung do'a, buku manasik, kain batik travel"; // Assuming similar for now unless specified
const DEFAULT_MEN_EQUIPMENT = "kain ihram, sabuk ihram";
const DEFAULT_WOMEN_EQUIPMENT = "mukenah, jilbab travel";
  
export default function PackageForm({ pkg }: { pkg?: any }) {
  const [imageUrl, setImageUrl] = useState(pkg?.imageUrl || "");
  const [selectedType, setSelectedType] = useState(pkg?.type || 'UMRAH');
  const [showConfirm, setShowConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: State = { message: "", errors: {} };
  
  // Choose action based on whether we are editing or creating
  const updatePackageWithId = pkg ? updatePackage.bind(null, pkg.id) : null;
  const action = pkg ? updatePackageWithId! : createPackage;

  const { setLoading } = useLoading();
  const { toast } = useToast();

  const [state, formAction] = useActionState(action, initialState);

  // Watch for state changes to show toasts
  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          title: "Gagal",
          description: state.message,
          variant: "destructive",
        });
      } else {
        // Assuming success if message exists but no errors (depends on action implementation)
        // Adjust logic based on actual server action return
        // Ideally pass a 'success' boolean from server
        // For now, let's assume if there are no field errors, it might be a general error OR success?
        // Let's rely on the fact that usually success redirects or updates locally.
        // If we want explicit success toast, we might need to modify the action to return status.
        // Let's assume if message is set and NOT error, it is success?
        // Or simpler: The Form Action usually handles redirect on success.
         toast({
          title: "Info",
          description: state.message,
          variant: Object.keys(state.errors || {}).length > 0 ? "destructive" : "default",
          className: Object.keys(state.errors || {}).length === 0 ? "bg-green-600 text-white" : ""
        });
      }
      setLoading(false);
    }
  }, [state, toast, setLoading]);

  const handleSubmit = (formData: FormData) => {
    setLoading(true);
    // The actual formAction will trigger the server action
    // We wrapped it in useActionState so we just need to submit the form
    // But since we are intercepting with AlertDialog, we need to trigger the real submission
    // However, useActionState works by passing `formAction` to the <form action={...}>
    // To manually submit we can use requestSubmit() on the form ref
    // But requestSubmit specific to the form will invoke the action attached to the form.
  };

  return (
    <>
    <Card className="max-w-3xl">
      <CardContent className="pt-6">
        <form 
            ref={formRef}
            action={(formData) => {
                // Determine if we need to show loading (we do)
                // We do this here to catch the actual submission start
                setLoading(true);
                formAction(formData);
            }} 
            className="space-y-6"
        >
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Informasi Dasar</h3>
            
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Package Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Umrah Akbar 2026"
              defaultValue={pkg?.title}
              aria-describedby="title-error"
            />
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p key={error} className="text-sm text-destructive">
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Type */}
             <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <div className="relative">
                     <Select
                        name="type"
                        defaultValue={selectedType}
                        onValueChange={setSelectedType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UMRAH">Umrah</SelectItem>
                          <SelectItem value="HAJI">Haji</SelectItem>
                        </SelectContent>
                      </Select>
                </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
                <Label htmlFor="price">Price (IDR)</Label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={pkg ? Number(pkg.price) : ''}
                />
            </div>
          </div>
          </div>

          {/* Section: Travel Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Informasi Perjalanan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Duration */}
             <div className="space-y-2">
                <Label htmlFor="duration">Duration (Days)</Label>
                <Input
                    id="duration"
                    name="duration"
                    type="number"
                    defaultValue={pkg?.duration}
                />
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
                <Label htmlFor="departureDate">Departure Date</Label>
                 <Input
                    id="departureDate"
                    name="departureDate"
                    type="text"
                    placeholder="e.g. 12 Agustus 2026"
                    defaultValue={pkg?.departureDate || ''}
                />
            </div>
          </div>
          
           {/* Airline */}
           <div className="space-y-2">
            <Label htmlFor="airline">Airline</Label>
             <Input
                id="airline"
                name="airline"
                type="text"
                placeholder="e.g. Lion Air (Direct Surabaya)"
                defaultValue={pkg?.airline || ''}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotel Makkah Group */}
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3 space-y-2">
                    <Label htmlFor="hotelMakkah">Hotel Makkah</Label>
                    <Input
                        id="hotelMakkah"
                        name="hotelMakkah"
                        type="text"
                        defaultValue={pkg?.hotelMakkah || ''}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="hotelMakkahRating">Star</Label>
                     <Input
                        id="hotelMakkahRating"
                        name="hotelMakkahRating"
                        type="number"
                        min="0"
                        max="5"
                        defaultValue={pkg?.hotelMakkahRating || 0}
                    />
                </div>
             </div>

             {/* Hotel Madinah Group */}
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3 space-y-2">
                    <Label htmlFor="hotelMadinah">Hotel Madinah</Label>
                    <Input
                        id="hotelMadinah"
                        name="hotelMadinah"
                        type="text"
                        defaultValue={pkg?.hotelMadinah || ''}
                    />
                </div>
                <div className="space-y-2">
                     <Label htmlFor="hotelMadinahRating">Star</Label>
                     <Input
                        id="hotelMadinahRating"
                        name="hotelMadinahRating"
                        type="number"
                        min="0"
                        max="5"
                        defaultValue={pkg?.hotelMadinahRating || 0}
                    />
            </div>
          </div>
          </div>

          {/* Section: Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Harga & Fasilitas</h3>

          {/* Amenities (Includes) */}
          <div className="space-y-2">
            <Label htmlFor="amenities">Harga Sudah Termasuk (Comma separated)</Label>
            <Input
                id="amenities"
                name="amenities"
                type="text"
                placeholder="Hotel *5, Visa, Makan 3x"
                defaultValue={pkg?.amenities ? (pkg.amenities as string[]).join(', ') : ''}
            />
          </div>

          {/* Price Excludes */}
          <div className="space-y-2">
            <Label htmlFor="priceExcludes">Harga Belum Termasuk (Comma separated)</Label>
             <Input
                id="priceExcludes"
                name="priceExcludes"
                type="text"
                placeholder="Perlengkapan, Paspor, Suntik Meningitis"
                defaultValue={pkg?.priceExcludes ? (pkg.priceExcludes as string[]).join(', ') : ''}
            />
          </div>

          {/* Equipment Section */}
          <div className="space-y-4 border rounded-lg p-4 bg-slate-50">
            <h3 className="font-semibold text-lg text-slate-700">Perlengkapan</h3>
            
            {/* General Equipment */}
            <div className="space-y-2">
                <Label htmlFor="generalEquipment">
                    {selectedType === 'HAJI' ? 'Perlengkapan Haji' : 'Perlengkapan Umrah'} (Comma separated)
                </Label>
                <Input
                    id="generalEquipment"
                    name="generalEquipment"
                    type="text"
                    placeholder="e.g. Koper, Tas, Buku Manasik"
                    defaultValue={pkg?.generalEquipment 
                        ? (Array.isArray(pkg.generalEquipment) ? pkg.generalEquipment.join(', ') : pkg.generalEquipment)
                        : (pkg ? '' : (selectedType === 'HAJI' ? DEFAULT_HAJI_EQUIPMENT : DEFAULT_UMRAH_EQUIPMENT))}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Men Equipment */}
                <div className="space-y-2">
                    <Label htmlFor="menEquipment">Perlengkapan Pria (Comma separated)</Label>
                    <Input
                        id="menEquipment"
                        name="menEquipment"
                        type="text"
                        placeholder="e.g. Kain Ihram, Sabuk"
                        defaultValue={pkg?.menEquipment 
                            ? (Array.isArray(pkg.menEquipment) ? pkg.menEquipment.join(', ') : pkg.menEquipment)
                            : (pkg ? '' : DEFAULT_MEN_EQUIPMENT)}
                    />
                </div>

                {/* Women Equipment */}
                <div className="space-y-2">
                    <Label htmlFor="womenEquipment">Perlengkapan Wanita (Comma separated)</Label>
                    <Input
                        id="womenEquipment"
                        name="womenEquipment"
                        type="text"
                        placeholder="e.g. Mukena, Jilbab"
                        defaultValue={pkg?.womenEquipment 
                            ? (Array.isArray(pkg.womenEquipment) ? pkg.womenEquipment.join(', ') : pkg.womenEquipment)
                            : (pkg ? '' : DEFAULT_WOMEN_EQUIPMENT)}
                    />
                </div>
            </div>
          </div>
          </div>

           {/* Featured Checkbox */}
           <div className="flex items-center space-x-2 border p-4 rounded-md">
                <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    defaultChecked={pkg?.isFeatured}
                />
                <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="isFeatured">Featured Package</Label>
                    <p className="text-sm text-muted-foreground">
                        Display this package on the homepage hero/featured section.
                    </p>
                </div>
          </div>
          </div>

          {/* Section: Additional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Informasi Tambahan</h3>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={pkg?.description}
            />
          </div>

           {/* Image URL (Optional) */}
            <div className="space-y-2">
                <Label>Package Image</Label>
                 <ImageUpload 
                    value={imageUrl} 
                    onChange={setImageUrl} 
                />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
                type="button" 
                onClick={() => setShowConfirm(true)}
            >
               {pkg ? 'Update Package' : 'Create Package'}
            </Button>
          </div>
          
           <div aria-live="polite" aria-atomic="true">
              {state.message && (
                <p className={`mt-2 text-sm ${Object.keys(state.errors || {}).length > 0 ? "text-destructive" : "text-green-600"}`}>
                  {state.message}
                </p>
              )}
            </div>
        </form>
      </CardContent>
    </Card>

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
            <AlertDialogAction onClick={() => {
                setShowConfirm(false);
                if (formRef.current) {
                    formRef.current.requestSubmit();
                }
            }}>
            Simpan
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}

