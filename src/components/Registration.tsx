"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: "Teenager" | "Adult";
  maritalStatus: "Single" | "Married";
  comingWith: "Yes" | "No" | "Coming with my spouse" | "Coming with a Guest";
  guestNames?: string;
  payingForGuest?: "Yes" | "No";
};

const Registration = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const comingWithValue = watch("comingWith");

  type ApiResponse = {
    success: boolean;
    data?: unknown;
    error?: string;
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as ApiResponse;

      if (response.ok && result.success) {
        toast.success("Registration submitted successfully!");
        reset();
        setOpen(false);
      } else {
        console.error("Submission error:", result.error ?? "Unknown error");
        toast.error("Error submitting registration. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 bg-white text-center">
      <ToastContainer />
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4 font-headline"
      >
        Family Beach Hangout 2025
      </motion.h2>
      <p className="mb-8 max-w-xl mx-auto text-gray-700 whitespace-pre-line">
        Exciting times are here. We are hanging out again as a family this year
        and hope to see you there.
        {"\n\n"}
        It&apos;ll be a time of bonding, walking in love, fun and getting to
        know one another again.
        {"\n\n"}
        Let us know your availability by filling this form
        {"\n\n"}
        Date: 22nd November, 2025 (Tentative Date)
        {"\n"}
        Arrival Time: 6:45am
        {"\n\n"}
        NO AFRICAN TIME!
      </p>

      {/* WhatsApp Help Text */}
      <p className="mb-4 text-gray-600">
        Having a challenge with the form? Send a message via WhatsApp to{" "}
        <a
          href="https://wa.me/2348063629277"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d23915] underline hover:text-[#b72318]"
        >
          Sis Wura
        </a>
        .
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-[#d23915] text-white py-3 px-8 rounded-lg font-semibold mb-4 cursor-pointer hover:bg-[#b72318] transition"
        onClick={() => setOpen(true)}
      >
        Open Registration Form
      </motion.button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative p-6 overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 text-left"
            >
              {/* First Name & Last Name side-by-side */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-normal text-black">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g James"
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                   text-[#000000] placeholder:text-gray-400
                   focus:border-[#ed7814] focus:ring-0"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block font-normal text-black">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Folasayo"
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                   text-[#000000] placeholder:text-gray-400
                   focus:border-[#ed7814] focus:ring-0"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email above Phone on mobile, side-by-side on larger screens */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 order-2 sm:order-1">
                  <label className="block font-normal text-black">
                    Phone Number *
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits",
                      },
                    }}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country="ng"
                        placeholder="+234 ..."
                        inputClass="w-full h-10 border border-gray-300 rounded px-3 py-2 
        text-[#000000] placeholder:text-gray-400
        focus:border-[#ed7814] focus:ring-0"
                        containerClass="w-full"
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                {/* <div className="flex-1 order-1 sm:order-2">
                  <label className="block font-normal text-black">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g james@example.com"
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                   text-[#000000] placeholder:text-gray-400
                   focus:border-[#ed7814] focus:ring-0"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div> */}
              </div>

              {/* Category */}
              <div>
                <label className="block font-normal text-black">
                  Which category do you fall under? *
                </label>
                <select
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
      text-[#000000] placeholder:text-gray-400
      focus:border-[#ed7814] focus:ring-0"
                  defaultValue=""
                  {...register("category", {
                    required: "Please select a category",
                  })}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Teenager">Teenager</option>
                  <option value="Adult">Adult</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Marital Status - Display only if category is "Adult" */}
              {watch("category") === "Adult" && (
                <div>
                  <label className="block font-normal text-black">
                    Are you single or married? *
                  </label>
                  <select
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
        text-[#000000] placeholder:text-gray-400
        focus:border-[#ed7814] focus:ring-0"
                    defaultValue=""
                    {...register("maritalStatus", {
                      required: "Please select your marital status",
                    })}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                  {errors.maritalStatus && (
                    <p className="text-red-500 text-sm">
                      {errors.maritalStatus.message}
                    </p>
                  )}
                </div>
              )}

              {/* Coming With */}
              <div>
                <label className="block font-normal text-black">
                  Would you be coming with child(ren) or with someone? *
                </label>
                <select
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                 text-[#000000] placeholder:text-gray-400
                 focus:border-[#ed7814] focus:ring-0"
                  defaultValue=""
                  {...register("comingWith", {
                    required: "Please select an option",
                  })}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Coming with my spouse">
                    Coming with my spouse
                  </option>
                  <option value="Coming with a Guest">
                    Coming with a Guest
                  </option>
                </select>
                {errors.comingWith && (
                  <p className="text-red-500 text-sm">
                    {errors.comingWith.message}
                  </p>
                )}
              </div>

              {/* Guest Names */}
              {(comingWithValue === "Yes" ||
                comingWithValue === "Coming with a Guest" ||
                comingWithValue === "Coming with my spouse") && (
                <div>
                  <label className="block font-normal text-black">
                    Please share their full name(s). Kindly separate multiple
                    names with commas *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest names separated by commas"
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
                   text-[#000000] placeholder:text-gray-400
                   focus:border-[#ed7814] focus:ring-0"
                    {...register("guestNames")}
                  />
                </div>
              )}

              {/* Paying For Guest */}
              {(comingWithValue === "Yes" ||
                comingWithValue === "Coming with my spouse" ||
                comingWithValue === "Coming with a Guest") && (
                <div>
                  <label className="block font-normal text-black">
                    Would you be the one paying for them?
                  </label>
                  <select
                    className="mt-1 w-full border border-gray-300 rounded px-3 py-2 
        text-[#000000] placeholder:text-gray-400
        focus:border-[#ed7814] focus:ring-0"
                    defaultValue=""
                    {...register("payingForGuest")}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              )}

              <div className="text-center mt-6">
                <p className="mb-4 text-gray-600">
                  Having a challenge with the form? Send a message via WhatsApp
                  to{" "}
                  <a
                    href="https://wa.me/2348063629277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d23915] underline hover:text-[#b72318]"
                  >
                    Sis Wura
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  className="bg-[#d23915] text-white cursor-pointer px-6 py-3 rounded-lg font-semibold hover:bg-[#b72318] transition flex items-center justify-center"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
