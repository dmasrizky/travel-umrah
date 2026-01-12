"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/app/icon.jpg"; // Importing the local icon

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Determine if we've already shown the loader this session (optional, but good UX)
    // For now, we show it on every refresh as requested "loading untuk render js"
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500); // Wait a bit at 100% before hiding
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.5 }}
           className="fixed inset-0 z-[9999] bg-brand-cream flex flex-col items-center justify-center"
        >
          <div className="relative w-32 h-32 mb-8 animate-pulse">
            <Image
              src={logo}
              alt="An Nur Logo"
              fill
              className="object-contain rounded-full border-4 border-brand-gold/20"
              priority
            />
          </div>
          
          <div className="w-64 h-1.5 bg-brand-gold/20 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-brand-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <p className="text-brand-green font-bold font-heading text-lg">
            {Math.round(progress)}%
          </p>
          
          <p className="text-brand-text/60 text-sm mt-2 font-medium">
             Memuat Halaman...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
