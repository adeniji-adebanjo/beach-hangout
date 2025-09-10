import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Registration from "@/components/Registration";
import Memories from "@/components/Memories";
import WhatToExpect from "@/components/WhatToExpect";
import Outfits from "@/components/Outfits";
import FAQs from "@/components/FAQs";
import ImageGallery from "@/components/ImageGallery";
import Footer from "@/components/Footer";

export default function BeachHangoutPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Registration />
      <Memories />
      <WhatToExpect />
      <Outfits />
      <FAQs />
      <ImageGallery />
      <Footer />
    </main>
  );
}
