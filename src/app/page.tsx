import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import PackagesGallery from "@/components/home/PackagesGallery";
import WhyUs from "@/components/home/WhyUs";
import GallerySection from "@/components/home/GallerySection";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <WhyUs />
      <PackagesGallery />
      <GallerySection />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}

