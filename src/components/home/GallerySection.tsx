"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Using Unsplash images that closely match the description:
// 1. Group in front of Kaaba (Green/Teal vibes if possible)
// 2. Pilgrims in Madinah
// 3. Manasik / Seminar context
// 4. Travel vibe

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1551041777-ed277b8dd990?q=80&w=1500&auto=format&fit=crop", // Night Prayer
    alt: "Suasana Malam di Masjidil Haram",
    caption: "Kekhusyukan Malam"
  },
  {
    src: "https://images.unsplash.com/photo-1581068106093-f7e2e604f9ea?q=80&w=1500&auto=format&fit=crop", // Architecture/Kaaba
    alt: "Keindahan Masjidil Haram",
    caption: "Kebersamaan di Baitullah"
  },
  {
    src: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?q=80&w=1500&auto=format&fit=crop", // Crowd walking
    alt: "Rombongan Jamaah",
    caption: "Keluarga Besar An Nur"
  },
  {
    src: "https://images.unsplash.com/photo-1596720510526-7881c628cac6?q=80&w=1500&auto=format&fit=crop", // Umbrellas/Madinah vibe but acceptable for general "Tanah Suci"
    alt: "Suasana Masjid",
    caption: "Kenyamanan Beribadah"
  }
];

export default function GallerySection() {
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
          <a 
            href="https://instagram.com/An Nurkarahagung" 
            target="_blank"
            className="hidden md:inline-flex px-6 py-3 rounded-full bg-brand-cream text-brand-green font-semibold hover:bg-brand-gold hover:text-white transition-all items-center gap-2 border border-brand-beige"
          >
            Lihat Lebih Banyak di Instagram
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg font-heading">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
             <a 
            href="https://instagram.com/An Nurkarahagung" 
            target="_blank"
            className="inline-flex px-6 py-3 rounded-full bg-brand-cream text-brand-green font-semibold hover:bg-brand-gold hover:text-white transition-all items-center gap-2 border border-brand-beige"
          >
            Lihat Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
