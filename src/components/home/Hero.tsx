"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import kaaba1 from "../assets/kaaba-1.jpg";
import kaaba2 from "../assets/kaaba-2.jpg";
import kaaba3 from "../assets/kaaba-3.jpg";

const HERO_IMAGES = [
  kaaba1,
  kaaba2,
  kaaba3
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center" id="beranda">
      {/* Background Image Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={HERO_IMAGES[currentImage]}
            alt="Makkah Atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex flex-col items-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-cream/90 text-brand-golden font-medium mb-6 backdrop-blur-sm shadow-sm border border-brand-gold/20 text-brand-text">
            Ijin Resmi Kemenag No. U.300 Th 2021
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight drop-shadow-md text-white">
            Wujudkan Rindu <br />
            <span className="text-brand-gold">Ke Baitullah</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-sm">
            Mitra perjalanan ibadah Umrah & Haji yang Amanah, Nyaman, dan Sesuai Sunnah. Bersama KBIH An Nur Surabaya.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="https://wa.me/628113097888"
              className="px-8 py-4 bg-brand-gold hover:bg-yellow-600 text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
            >
              Daftar Umrah
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="https://wa.me/628113097888?text=Saya%20ingin%20konsultasi%20umrah"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full font-semibold text-lg transition-all backdrop-blur-md"
            >
              Konsultasi
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-sm uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}