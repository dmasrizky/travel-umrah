"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

// Using Unsplash images that closely match the description:
// 1. Group in front of Kaaba (Green/Teal vibes if possible)
// 2. Pilgrims in Madinah
// 3. Manasik / Seminar context
// 4. Travel vibe

import { Gallery } from "@prisma/client";

interface GallerySectionProps {
    items: Gallery[];
}

export default function GallerySection({ items }: GallerySectionProps) {
  // Use passed items or fallback if empty (optional, but good for robustness while starting)
  // const displayItems = items.length > 0 ? items : GALLERY_IMAGES; // If we want fallback
  const displayItems = items; 

  return (
    <section className="py-24 bg-white" id="galeri">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-green mb-4">
              Galeri Kegiatan
            </h2>
            <p className="text-lg text-slate-600 max-w-xl">
              Dokumentasi perjalanan ibadah bersama An Nur Karah Agung.
              Dari manasik hingga kembali ke tanah air.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-2 font-heading">Galeri Sedang Disiapkan</h3>
              <p className="text-slate-500 max-w-md">
                Dokumentasi perjalanan ibadah kami akan segera hadir. Nantikan momen-momen indah bersama jamaah.
              </p>
            </div>
          )}
          {displayItems.map((item, index) => (
            <Dialog key={item.id || index}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white font-bold text-lg font-heading">{item.title}</p>
                    <p className="text-yellow-400 text-sm font-medium mt-1">Lihat Foto</p>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none flex items-center justify-center">
                <DialogTitle className="sr-only">{item.title}</DialogTitle>
                 <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain"
                    />
                 </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
        </div>
      </div>
    </section>
  );
}
