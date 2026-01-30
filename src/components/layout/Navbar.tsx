"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImage from "../assets/logo.jpg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-brand-cream"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
           {/* Logo Image */}
           <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold/50 shadow-md">
             <Image 
               src={logoImage} 
               alt="An Nur Karah Agung Logo" 
               fill
               className="object-cover"
               sizes="(max-width: 768px) 48px, 48px"
             />
           </div>
           <div className="flex flex-col">
             <span className={cn("text-lg font-bold leading-tight font-heading", isScrolled ? "text-brand-text" : "text-white")}>
               An Nur Karah Agung
             </span>
             <span className={cn("text-xs font-medium", isScrolled ? "text-brand-green" : "text-brand-cream")}>
               Tour & Travel
             </span>
           </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[{name: "Beranda", id: "beranda"}, {name: "Mengapa Kami", id: "mengapa-kami"}, {name: "Paket Ibadah", id: "paket-ibadah"}, {name: "Galeri", id: "galeri"}, {name: "Testimoni", id: "testimoni"}].map((item) => (
            <button
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                   // If element not found (e.g. we are on detail page), go to home with anchor
                   window.location.href = `/#${item.id}`;
                }
              }}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-gold cursor-pointer",
                isScrolled ? "text-brand-text" : "text-white/90"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link
             href="https://wa.me/628113097888"
             target="_blank"
             className="px-6 py-2.5 rounded-full bg-brand-green text-white font-medium text-sm hover:bg-brand-gold transition-colors shadow-lg shadow-brand-green/20 flex items-center gap-2"
          >
            <Phone size={16} />
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-brand-text" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-brand-text" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-brand-cream p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
          {[{name: "Beranda", id: "beranda"}, {name: "Mengapa Kami", id: "mengapa-kami"}, {name: "Paket Ibadah", id: "paket-ibadah"}, {name: "Galeri", id: "galeri"}, {name: "Testimoni", id: "testimoni"}].map((item) => (
            <button
              key={item.name}
              onClick={() => {
                 setIsMobileMenuOpen(false);
                 const element = document.getElementById(item.id);
                 if (element) {
                   element.scrollIntoView({ behavior: "smooth" });
                 } else {
                   window.location.href = `/#${item.id}`;
                 }
              }}
              className="text-brand-text font-medium py-2 border-b border-brand-cream hover:text-brand-green text-left"
            >
              {item.name}
            </button>
          ))}
           <Link
             href="https://wa.me/628113097888"
             className="px-6 py-3 rounded-full bg-brand-green text-white font-medium text-center hover:bg-brand-gold transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      )}
    </nav>
  );
}
