"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Calendar, CheckCircle2, Clock, Hotel, Plane, Star } from "lucide-react";

import Link from "next/link";
// Button import removed
import { Package } from "@prisma/client";

// Define an interface that matches what we need from Prisma Package + any computations
interface PackageWithComputed extends Omit<Package, 'price' | 'amenities'> {
    price: number;
    amenities: string[] | any; // Json in Prisma
}

export default function PackagesGallery({ packages }: { packages: PackageWithComputed[] }) {
  // Use packages passed from props, or empty array if null
  const displayPackages = packages || [];

  return (
    <section className="min-h-screen bg-brand-beige flex flex-col justify-center py-12 md:py-0" id="paket-ibadah">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="max-w-xl">
             <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
               <span className="text-brand-green">Pilihan Paket </span>
               <span className="text-brand-gold">Ibadah</span>
             </h2>
             <p className="text-base md:text-lg text-slate-600 line-clamp-2 md:line-clamp-none leading-relaxed">
               Temukan paket Ibadah terbaik yang dirancang khusus untuk kenyamanan dan kekhusyukan ibadah Anda bersama keluarga tercinta.
             </p>
          </div>
        </div>

        {displayPackages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mb-6">
                    <Calendar size={40} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-2 font-heading">Belum Ada Paket Tersedia</h3>
                <p className="text-slate-500 max-w-md mb-6">
                    Paket ibadah sedang dalam persiapan. Hubungi kami untuk informasi lebih lanjut atau jadwal keberangkatan terbaru.
                </p>
                <a 
                    href="https://wa.me/628113097888" 
                    className="px-6 py-3 bg-brand-green hover:bg-brand-gold text-white rounded-full font-semibold transition-all btn-press"
                >
                    Hubungi Kami
                </a>
            </div>
        ) : (
            <>
            {/* Scroll Indicator for Mobile */}
            <div className="flex items-center gap-2 mb-4 md:hidden text-slate-500 text-sm">
                <span>Geser untuk melihat lebih banyak</span>
                <ArrowUpRight size={16} className="animate-pulse" />
            </div>
            <div className="flex overflow-x-auto gap-6 pb-8 md:pb-4 snap-x snap-mandatory -mx-4 px-4 md:px-0 md:mx-0 hide-scrollbar items-stretch">
            {displayPackages.map((pkg, index) => (
                <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-cream flex flex-col min-w-[300px] md:min-w-[360px] snap-center shrink-0"
                >
                {/* Image Container - Reduced height slightly to fit screen */}
                <div className="relative h-56 md:h-60 w-full overflow-hidden shrink-0">
                    <Image
                    src={pkg.imageUrl || 'https://images.unsplash.com/photo-1596720510526-7881c628cac6?q=80&w=1000&auto=format&fit=crop'}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {pkg.isFeatured && (
                        <div className="absolute top-4 right-4 bg-brand-gold text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                        Featured
                        </div>
                    )}
                    {/* <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
                        <p className="text-white font-bold text-lg flex items-center gap-2">
                            <Calendar size={16} className="text-brand-gold"/>
                            {pkg.departureDate || 'Jadwal Menyusul'}
                        </p>
                    </div> */}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-brand-text mb-1 line-clamp-2 min-h-[3.5rem]">{pkg.title}</h3>
                        <div className="flex items-center gap-4 text-slate-500 text-sm">
                        <span className="flex items-center gap-1.5"><Clock size={16}/> {pkg.duration} Hari</span>
                        <span className="flex items-center gap-1.5"><Plane size={16}/> {pkg.airline || 'Pesawat'}</span>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6 flex-grow">
                        <div className="flex items-start gap-3 text-slate-600 text-sm">
                            <Calendar size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{pkg.departureDate ? `${pkg.departureDate}` : 'Jadwal Menyusul'}</span>
                        </div>
                        <div className="flex items-start gap-3 text-slate-600 text-sm">
                            <Hotel size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                                <span className="line-clamp-1 font-medium">{pkg.hotelMakkah ? `${pkg.hotelMakkah} (Hotel Makkah)` : 'Hotel Makkah'}</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 text-slate-600 text-sm">
                            <Hotel size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                                <span className="line-clamp-1 font-medium">{pkg.hotelMadinah ? `${pkg.hotelMadinah} (Hotel Madinah)` : 'Hotel Madinah'}</span>
                            </div>
                        </div>
                        {Array.isArray(pkg.amenities) && pkg.amenities.slice(0, 2).map((feature: string, i: number) => (
                            <div key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                            <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-brand-cream mt-auto">
                        <div className="flex items-end justify-between mb-3">
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Harga Mulai</p>
                                <p className="text-lg font-bold text-brand-green">Rp {Number(pkg.price).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                        <Link 
                            href={`/paket/${pkg.slug}`}
                            className="w-full py-2.5 rounded-xl bg-brand-cream text-brand-green font-bold flex items-center justify-center gap-2 group-hover:bg-brand-green group-hover:text-white hover:!bg-brand-gold hover:!text-white transition-all shadow-sm hover:shadow-md"
                        >
                            Lihat Detail Paket <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
            </>
        )}
      </div>
    </section>
  );
}
