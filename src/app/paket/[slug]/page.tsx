import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin, Plane, CheckCircle2, Phone } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PACKAGES, COMMON_INCLUSIONS } from '@/lib/packages';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = PACKAGES.find((p) => p.slug === slug);
  
  if (!pkg) {
    return {
      title: 'Paket Tidak Ditemukan',
    };
  }

  return {
    title: `${pkg.title} | An Nur Karah Agung`,
    description: `Paket ${pkg.title} selama ${pkg.duration} keberangkatan ${pkg.departureDate}. Harga mulai ${pkg.price}.`,
  };
}

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export default async function PackageDetail({ params }: Props) {
  const { slug } = await params;
  const pkg = PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Article Header Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-12 text-white">
          <Link 
            href="/#paket-umrah" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors w-fit"
          >
            <ArrowLeft size={20} />
            Kembali ke Daftar Paket
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold text-white font-bold text-sm mb-4">
               {pkg.duration} Perjalanan Ibadah
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
              {pkg.title}
            </h1>
            <p className="text-xl text-white/90 flex items-center gap-2 font-light">
               <Calendar size={20} className="text-brand-gold" />
               Keberangkatan: {pkg.departureDate}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content (Article Style) */}
            <article className="w-full lg:w-2/3 mx-auto">
                {/* Intro / Price */}
                <div className="mb-12 border-b border-slate-100 pb-8">
                     <p className="text-slate-600 text-lg leading-relaxed mb-6">
                        Temukan ketenangan dan kekhusyukan dalam perjalanan ibadah umrah bersama KBIH An Nur Karah Agung. 
                        Paket {pkg.title} ini dirancang khusus untuk kenyamanan Anda dalam beribadah di Tanah Suci. 
                        Dengan durasi {pkg.duration}, Anda akan mendapatkan pengalaman spiritual yang mendalam.
                     </p>
                     
                     <div className="flex items-center justify-between bg-brand-cream/30 p-6 rounded-2xl border border-brand-cream">
                        <div>
                            <p className="text-sm text-slate-500 mb-1">Harga Mulai</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-green">{pkg.price}</h2>
                        </div>
                        <Link
                            href={`https://wa.me/628113097888?text=Assalamualaikum,%20saya%20tertarik%20dengan%20paket%20${pkg.title}%20(${pkg.departureDate})`}
                            className="px-6 py-3 bg-brand-gold hover:bg-yellow-600 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                        >
                            <Phone size={18} />
                            Booking
                        </Link>
                     </div>
                </div>

                {/* Section: Detail Keberangkatan */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold font-heading text-brand-text mb-6">Detail Perjalanan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                            <Plane className="text-brand-gold shrink-0 mt-1" size={24} />
                            <div>
                                <h4 className="font-bold text-slate-800">Penerbangan</h4>
                                <p className="text-slate-600">{pkg.airline}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                            <Clock className="text-brand-gold shrink-0 mt-1" size={24} />
                            <div>
                                <h4 className="font-bold text-slate-800">Durasi</h4>
                                <p className="text-slate-600">{pkg.duration}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Akomodasi */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold font-heading text-brand-text mb-6">Akomodasi Hotel</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold shrink-0">
                                M
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Makkah</p>
                                <p className="text-lg font-semibold text-slate-800">{pkg.hotelMakkah}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl shadow-sm">
                            <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold font-bold shrink-0">
                                M
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Madinah</p>
                                <p className="text-lg font-semibold text-slate-800">{pkg.hotelMadinah}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Fasilitas */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold font-heading text-brand-text mb-6">Fasilitas Termasuk</h3>
                    <div className="grid grid-cols-1 gap-3">
                         {COMMON_INCLUSIONS.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="text-brand-gold shrink-0 mt-1" size={18} />
                                <span className="text-slate-600 leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* CTA Bottom */}
                 <div className="bg-brand-green text-white p-8 rounded-3xl text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">Siap untuk Berangkat?</h3>
                        <p className="mb-8 text-brand-cream/80 max-w-md mx-auto">
                            Segera amankan kursi Anda. Kuota terbatas untuk keberangkatan tanggal {pkg.departureDate}.
                        </p>
                        <Link
                            href={`https://wa.me/628113097888?text=Assalamualaikum,%20saya%20tertarik%20dengan%20paket%20${pkg.title}%20(${pkg.departureDate})`}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold hover:bg-yellow-600 text-white rounded-xl font-bold transition-all shadow-lg"
                        >
                            <Phone size={20} />
                            Hubungi Kami Sekarang
                        </Link>
                    </div>
                    {/* Decorative Pattern Background */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/3 -translate-y-1/3">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
                           <path d="M100 0L200 100L100 200L0 100L100 0Z" />
                        </svg>
                    </div>
                 </div>

            </article>

             {/* Sidebar (Optional - for related or contact quick access on desktop) 
                 Hidden on mobile, visible on LG screens if needed. 
                 For now, keeping it simple as per request "article only" but a wide article.
                 The reference has a sidebar with "Related Posts", but maybe we don't need it.
                 I'll keep the layout centered on the article content.
             */}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
