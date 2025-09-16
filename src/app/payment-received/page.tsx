"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentReceivedPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-300 text-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Received!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your registration has been successfully
            acknowledged. We look forward to seeing you at the Beach Hangout!
          </p>
          <Link
            href="/"
            className="inline-block bg-[#d23915] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b72318] transition"
          >
            Go Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
