"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Testimonial } from "@prisma/client";

interface TestimonialsProps {
    items: Testimonial[];
}

export default function Testimonials({ items }: TestimonialsProps) {
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
           {items.length === 0 && (
             <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                <Quote size={40} className="text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-2 font-heading">Testimoni Akan Hadir</h3>
              <p className="text-slate-500 max-w-md">
                Cerita dan pengalaman para jamaah kami akan segera ditampilkan di sini.
              </p>
            </div>
          )}
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-brand-beige relative flex flex-col hover:-translate-y-1"
            >
              <Quote className="text-brand-gold/20 mb-6 rotate-180" size={40} />
              
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow italic">
                "{item.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-gold/30">
                  {item.avatarUrl ? (
                     <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-beige flex items-center justify-center text-brand-green font-bold text-lg">
                        {item.name.charAt(0)}
                    </div>
                  )}
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
