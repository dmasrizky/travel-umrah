import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import PackagesGallery from "@/components/home/PackagesGallery";
import WhyUs from "@/components/home/WhyUs";
import GallerySection from "@/components/home/GallerySection";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

import { prisma } from "@/lib/prisma";

export const revalidate = 0; // Disable cache for now to see updates

export default async function Home() {
  const data = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const packages = data.map((pkg) => ({
    ...pkg,
    price: pkg.price.toNumber(),
  }));

  const galleryItems = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8, // Limit to 8 images
  });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3, // Limit to 3 testimonials
  });

  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <WhyUs />
      <PackagesGallery packages={packages} />
      <GallerySection items={galleryItems} />
      <Testimonials items={testimonials} />
      <CTASection />
      <Footer />
    </main>
  );
}

