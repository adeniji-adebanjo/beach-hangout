import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Registration from "@/components/Registration";
import Memories from "@/components/Memories";
import WhatToExpect from "@/components/WhatToExpect";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";

export default function BeachHangoutPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Registration />
      <Memories />
      <WhatToExpect />
      <FAQs />
      <Footer />
    </main>
  );
}
