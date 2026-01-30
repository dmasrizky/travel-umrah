"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-brand-green rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center shadow-2xl">
          {/* Background Patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Siap Menunaikan Ibadah ke Baitullah?
            </h2>
            <p className="text-lg text-brand-cream/90 mb-10 leading-relaxed font-light">
              Mari wujudkan impian ibadah Anda bersama An Nur Karah Agung. 
              Dapatkan konsultasi gratis dan bimbingan terbaik dari kami.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://wa.me/628113097888"
                className="px-8 py-4 bg-brand-gold hover:bg-yellow-600 text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 btn-press"
              >
                Daftar Sekarang
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="https://wa.me/628113097888?text=Saya%20ingin%20konsultasi%20umrah"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 btn-press"
              >
                <Phone size={20} />
                Hubungi Kami
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
