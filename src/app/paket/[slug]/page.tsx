import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { BadgeCheck, Calendar, Check, Clock, Hotel, Plane, ArrowLeft, XCircle, Star } from 'lucide-react';

const prisma = new PrismaClient();

export const revalidate = 0; 

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await prisma.package.findUnique({
    where: { slug },
  });

  if (!pkg) {
    notFound();
  }

  // Helper to format price
  const formattedPrice = Number(pkg.price).toLocaleString('id-ID');

  // Parse amenities helpers
  const amenities = Array.isArray(pkg.amenities) ? (pkg.amenities as string[]) : [];
  const priceExcludes = Array.isArray(pkg.priceExcludes) ? (pkg.priceExcludes as string[]) : [];
  const generalEquipment = Array.isArray(pkg.generalEquipment) ? (pkg.generalEquipment as string[]) : [];
  const menEquipment = Array.isArray(pkg.menEquipment) ? (pkg.menEquipment as string[]) : [];
  const womenEquipment = Array.isArray(pkg.womenEquipment) ? (pkg.womenEquipment as string[]) : [];

  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* Sticky Bottom Nav for Mobile Booking */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden flex justify-between items-center">
        <div>
            <p className="text-xs text-gray-500">Mulai dari</p>
            <p className="text-lg font-bold text-brand-green">Rp {formattedPrice}</p>
        </div>
        <Link
            href={`https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20tertarik%20dengan%20paket%20${pkg.title}`}
            className="bg-brand-gold text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-yellow-600 transition-colors"
        >
            Pesan Sekarang
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
         <Image
            src={pkg.imageUrl || 'https://images.unsplash.com/photo-1596720510526-7881c628cac6?q=80&w=1000&auto=format&fit=crop'}
            alt={pkg.title}
            fill
            className="object-cover"
         />
         <div className="absolute inset-0 bg-black/50" />
         <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-center text-white h-full">
            <Link href="/#paket-umrah" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 w-fit hover:underline">
                <ArrowLeft size={20} /> Kembali ke Beranda
            </Link>
            <div className="max-w-3xl">
                {pkg.isFeatured && (
                    <span className="bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                        Featured Package
                    </span>
                )}
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                    {pkg.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/90">
                     <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <Clock size={16} /> {pkg.duration} Hari
                     </span>
                     <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <Plane size={16} /> {pkg.airline || 'Direct Flight'}
                     </span>
                     <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <Calendar size={16} /> {pkg.departureDate || 'Jadwal Menyusul'}
                     </span>
                </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Highlights / Hotels */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Hotel size={16} className="text-brand-gold" /> Hotel Makkah
                        </p>
                        <p className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            {pkg.hotelMakkah || 'TBA'}
                            {pkg.hotelMakkahRating > 0 && (
                                <span className="flex text-brand-gold">
                                    {[...Array(pkg.hotelMakkahRating)].map((_, i) => (
                                        <Star key={i} size={14} fill="currentColor" />
                                    ))}
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Hotel size={16} className="text-brand-gold" /> Hotel Madinah
                        </p>
                        <p className="font-bold text-lg text-gray-800 flex items-center gap-2">
                            {pkg.hotelMadinah || 'TBA'}
                            {pkg.hotelMadinahRating > 0 && (
                                <span className="flex text-brand-gold">
                                    {[...Array(pkg.hotelMadinahRating)].map((_, i) => (
                                        <Star key={i} size={14} fill="currentColor" />
                                    ))}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-brand-green mb-4 font-heading">Deskripsi Paket</h2>
                    <div className="prose max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                        {pkg.description}
                    </div>
                </div>

                {/* Amenities */}
                 <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-brand-green mb-6 font-heading">Harga Sudah Termasuk</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {amenities.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="mt-0.5 bg-brand-green/10 p-1 rounded-full text-brand-green">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Equipment Section */}
                 {(generalEquipment.length > 0 || menEquipment.length > 0 || womenEquipment.length > 0) && (
                     <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-brand-green mb-6 font-heading">Perlengkapan</h2>
                        
                        {generalEquipment.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-bold text-lg text-gray-800 mb-3">
                                    {pkg.type === 'HAJI' ? 'Perlengkapan Haji' : 'Perlengkapan Umrah'}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {generalEquipment.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-0.5 bg-brand-gold/10 p-1 rounded-full text-brand-gold">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {menEquipment.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-bold text-lg text-gray-800 mb-3">Laki-laki</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {menEquipment.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                             <div className="mt-0.5 bg-brand-gold/10 p-1 rounded-full text-brand-gold">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {womenEquipment.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 mb-3">Perempuan</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {womenEquipment.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                             <div className="mt-0.5 bg-brand-gold/10 p-1 rounded-full text-brand-gold">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                 )}

                 {/* Price Excludes */}
                 {priceExcludes.length > 0 && (
                     <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-red-500 mb-6 font-heading">Harga Belum Termasuk</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {priceExcludes.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="mt-0.5 bg-red-50 p-1 rounded-full text-red-500">
                                        <XCircle size={14} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                 )}

            </div>

            {/* Right Column: Pricing & Booking (Sticky on Desktop) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-brand-green/10">
                        <p className="text-sm text-center text-gray-500 mb-2">Harga Mulai Dari</p>
                        <p className="text-4xl font-bold text-center text-brand-green mb-6">
                            Rp {formattedPrice}
                            <span className="text-base font-normal text-gray-400 block mt-1">/ jamaah</span>
                        </p>
                        
                         <Link
                            href={`https://wa.me/6281234567890?text=Assalamualaikum,%20saya%20tertarik%20dengan%20paket%20${pkg.title}`}
                            className="w-full block text-center bg-brand-gold hover:bg-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all mb-4"
                        >
                            Booking via WhatsApp
                        </Link>
                        <p className="text-xs text-center text-gray-400">
                            Hubungi kami untuk ketersediaan seat dan info lebih lanjut.
                        </p>
                    </div>

                    <div className="bg-brand-green text-white rounded-3xl p-6 md:p-8 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                             <div className="bg-white/20 p-3 rounded-full">
                                <BadgeCheck size={24} />
                             </div>
                             <div>
                                <h3 className="font-bold text-lg">Travel Resmi Terpercaya</h3>
                                <p className="text-white/80 text-sm">
                                    {pkg.type === 'HAJI' 
                                        ? 'Izin Pelayanan Haji Kemenag No. 1081 Thn 2021'
                                        : 'Izin Pelayanan Umrah Kemenag No. 674 Thn 2017'
                                    }
                                </p>
                             </div>
                        </div>
                         <div className="flex items-center gap-4">
                             <div className="bg-white/20 p-3 rounded-full">
                                <Calendar size={24} />
                             </div>
                             <div>
                                <h3 className="font-bold text-lg">Jadwal Pasti</h3>
                                <p className="text-white/80 text-sm">Garansi keberangkatan 100%</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </main>
  );
}
