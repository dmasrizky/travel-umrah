"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, HeartHandshake, Users } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Resmi & Berizin",
    description: "Kami telah mengantongi izin resmi Kemenag RI (PPIU No. U.300 Th 2021). Ibadah tenang, keluarga tenang."
  },
  {
    icon: HeartHandshake,
    title: "Bimbingan Maksimal",
    description: "Dibimbing langsung oleh Ustadz berpengalaman & bersertifikat. Manasik intensif sebelum keberangkatan."
  },
  {
    icon: Star,
    title: "Fasilitas Terjamin",
    description: "Akomodasi hotel setaraf bintang 4 & 5 yang dekat dengan Masjidil Haram & Nabawi untuk kenyamanan ibadah."
  },
  {
    icon: Users,
    title: "Kekeluargaan",
    description: "Membangun ukhuwah islamiyah antar jamaah. Suasana perjalanan yang hangat layaknya keluarga sendiri."
  }
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white" id="tentang-kami">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-green mb-6">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Komitmen kami untuk memberikan pelayanan terbaik bagi Tamu Allah, 
            memastikan ibadah Anda khusyuk dan nyaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300 border-2 border-brand-cream hover:border-brand-gold/30 group text-center hover:-translate-y-2"
            >
              <div className="w-20 h-20 rounded-2xl bg-brand-cream/50 text-brand-gold flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300 shadow-sm">
                <feature.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-brand-text mb-4 group-hover:text-brand-green transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
