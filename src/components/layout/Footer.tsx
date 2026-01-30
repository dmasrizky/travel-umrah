import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, MapPin, Mail } from "lucide-react";
import logoImage from "../assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-brand-green text-brand-cream py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold/50 shadow-md">
                 <Image 
                   src={logoImage} 
                   alt="An Nur Karah Agung Logo" 
                   fill
                   className="object-cover"
                 />
               </div>
               <div className="flex flex-col">
                 <span className="text-lg font-bold text-white leading-tight font-heading">
                   An Nur Karah Agung
                 </span>
                 <span className="text-xs font-medium text-brand-gold">
                   PT. Nur Haramain Tours & Travel
                 </span>
               </div>
            </div>
            <p className="mb-6 leading-relaxed max-w-sm text-brand-cream/80">
              Kami siap melayani perjalanan ibadah Umrah & Haji Anda dengan pelayanan prima dan fasilitas terbaik.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/annurkarahagung/?hl=en" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.facebook.com/anaurkarahagung" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 font-heading">Hubungi Kami</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="shrink-0 text-brand-gold mt-1" size={20} />
                <p>Jl. Karah Agung No. 9,<br />Surabaya, Jawa Timur</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="shrink-0 text-brand-gold" size={20} />
                <p>0811-3097-888 / 031-8282259</p>
              </div>
              <div className="flex items-center gap-3">
                 <Mail className="shrink-0 text-brand-gold" size={20} />
                 <p>annurkarahagung@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
             <h4 className="text-white font-bold text-lg mb-6 font-heading">Menu</h4>
             <ul className="space-y-3">
                <li><Link href="/#beranda" className="hover:text-brand-gold transition-colors">Beranda</Link></li>
                <li><Link href="/#mengapa-kami" className="hover:text-brand-gold transition-colors">Mengapa Kami</Link></li>
                <li><Link href="/#paket-ibadah" className="hover:text-brand-gold transition-colors">Paket Ibadah</Link></li>
                <li><Link href="/#galeri" className="hover:text-brand-gold transition-colors">Galeri</Link></li>
                <li><Link href="/#testimoni" className="hover:text-brand-gold transition-colors">Testimoni</Link></li>
             </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-brand-cream/60">
          © {new Date().getFullYear()} An Nur Karah Agung. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
