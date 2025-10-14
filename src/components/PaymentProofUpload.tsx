"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentProofUpload() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/payment-proof", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.redirect) {
        router.push(data.redirect);
      } else {
        setMessage(data.message || "Upload failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Upload Payment Proof
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="flex gap-2">
          <div className="w-1/2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1 text-black"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder:text-black placeholder:opacity-50"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1 text-black"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder:text-black placeholder:opacity-50"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-1 text-black"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder:text-black placeholder:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="method"
            className="block text-sm font-medium mb-1 text-black"
          >
            Payment Method
          </label>
          <select
            id="method"
            name="method"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white"
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="POS">POS</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium mb-1 text-black"
          >
            Upload Receipt / Proof of Payment
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#d23915] text-white cursor-pointer py-2 px-4 rounded-lg hover:bg-[#b72318] transition"
        >
          {loading ? "Uploading..." : "Submit Proof"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
