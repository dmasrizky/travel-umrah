"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Hj. Siti Aminah",
    role: "Jamaah Umrah 2024",
    content: "MasyaAllah, pelayanan yang sangat luar biasa. Pembimbingnya sangat sabar dan berilmu. Hotelnya juga sangat dekat dengan masjid.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
  },
  {
    name: "H. Ahmad Fauzi",
    role: "Jamaah Haji Plus",
    content: "Alhamdulillah perjalanan haji kami dilancarkan. Fasilitas yang diberikan sesuai dengan yang dijanjikan. Terima kasih KBIH An Nur.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
  },
  {
    name: "Ibu Rina Wati",
    role: "Jamaah Umrah Ramadan",
    content: "Pengalaman umrah pertama yang sangat berkesan. Suasana kekeluargaannya sangat terasa, serasa berangkat dengan keluarga sendiri.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden" id="testimoni">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-semibold tracking-wider text-sm uppercase mb-2 block">Kata Mereka</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-green mb-6">
            Cerita Para Tamu Allah
          </h2>
          <p className="text-lg text-slate-600">
            Kenyamanan dan kepuasan jamaah adalah prioritas utama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-brand-beige relative flex flex-col"
            >
              <Quote className="text-brand-gold/20 mb-6 rotate-180" size={40} />
              
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow italic">
                "{item.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-gold/30">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-brand-text font-heading">{item.name}</h4>
                  <p className="text-xs text-brand-green/80 font-medium">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
