import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center relative bg-cover bg-center bg-no-repeat bg-[url('/error-404-mobile.webp')] md:bg-[url('/error-404-desktop.webp')]">
        {/* Overlay with opacity */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-6xl font-bold text-[#d23915] mb-4">
            Wave Crashed the Page 🏄
          </h1>
          <p className="text-xl text-gray-100 dark:text-gray-300 mb-6">
            Oops! The tide must have washed this page away.
          </p>
          <Link
            href="/"
            className="bg-[#d23915] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b72318] transition"
          >
            🏄 Surf Back Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
