"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Calendar, CheckCircle2, Clock, MapPin, Plane } from "lucide-react";

import Link from "next/link";
import { PACKAGES } from "@/lib/packages";

export default function PackagesGallery() {
  return (
    <section className="py-24 bg-brand-beige" id="paket-umrah">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
             <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-green mb-4">
               Pilihan Paket Ibadah
             </h2>
             <p className="text-lg text-slate-600">
               Kami menyediakan berbagai pilihan paket Umrah yang dapat disesuaikan dengan kebutuhan dan kenyamanan Anda.
             </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-brand-gold font-semibold hover:text-yellow-600 transition-colors">
            Lihat Semua Paket <ArrowUpRight size={20} />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory -mx-4 px-4 md:px-0 md:mx-0 hide-scrollbar">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-cream flex flex-col min-w-[320px] md:min-w-[380px] snap-center shrink-0"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden shrink-0">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {pkg.isPromo && (
                    <div className="absolute top-4 right-4 bg-brand-gold text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                      Promo Spesial
                    </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
                     <p className="text-white font-bold text-lg flex items-center gap-2">
                        <Calendar size={16} className="text-brand-gold"/>
                        {pkg.departureDate}
                     </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-brand-text mb-2 line-clamp-2 min-h-[4rem]">{pkg.title}</h3>
                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                      <span className="flex items-center gap-1.5"><Clock size={16}/> {pkg.duration}</span>
                      <span className="flex items-center gap-1.5"><Plane size={16}/> {pkg.airline.split(' ')[0]}</span>
                    </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-3 text-slate-600 text-sm">
                        <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pkg.hotelMakkah}</span>
                    </div>
                    <div className="flex items-start gap-3 text-slate-600 text-sm">
                        <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pkg.hotelMadinah}</span>
                    </div>
                    {pkg.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-brand-cream mt-auto">
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <p className="text-xs text-slate-400 mb-1">Harga Mulai</p>
                            <p className="text-xl font-bold text-brand-green">{pkg.price}</p>
                        </div>
                    </div>
                    <Link 
                        href={`/paket/${pkg.slug}`}
                        className="w-full py-3 rounded-xl bg-brand-cream text-brand-green font-bold flex items-center justify-center gap-2 group-hover:bg-brand-green group-hover:text-white hover:!bg-brand-gold hover:!text-white transition-all shadow-sm hover:shadow-md"
                    >
                        Lihat Detail Paket <ArrowUpRight size={18} />
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
             <button className="inline-flex items-center gap-2 text-brand-gold font-semibold hover:text-yellow-600 transition-colors">
                Lihat Semua Paket <ArrowUpRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
}
