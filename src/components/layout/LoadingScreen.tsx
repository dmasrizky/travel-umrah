


import Image from "next/image";
import logo from "@/app/icon.jpg"; // Importing the local icon

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-brand-cream flex flex-col items-center justify-center">
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
        <div 
          className="h-full bg-brand-gold animate-[loading_1.5s_ease-in-out_infinite]"
          style={{ width: '50%' }}
        />
      </div>

      <p className="text-brand-green font-bold font-heading text-lg animate-pulse">
        Memuat...
      </p>
    </div>
  );
}
