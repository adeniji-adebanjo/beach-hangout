"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const comingWithValue = watch("comingWith");

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
    setOpen(false);
  };

  return (
    <section id="register" className="py-20 bg-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
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

      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold mb-4"
        onClick={() => setOpen(true)}
      >
        Open Registration Form
      </motion.button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative p-6 overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
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
                  <label className="block font-medium">First Name *</label>
                  <input
                    type="text"
                    placeholder="e.g James"
                    className="mt-1 w-full border rounded px-3 py-2"
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
                  <label className="block font-medium">Last Name *</label>
                  <input
                    type="text"
                    placeholder="e.g Folasayo"
                    className="mt-1 w-full border rounded px-3 py-2"
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
                  <label className="block font-medium">Phone Number *</label>
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
                        inputClass="w-full border rounded px-3 py-2"
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 order-1 sm:order-2">
                  <label className="block font-medium">Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g james@example.com"
                    className="mt-1 w-full border rounded px-3 py-2"
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
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block font-medium">
                  Which category do you fall under? *
                </label>
                <select
                  className="mt-1 w-full border rounded px-3 py-2"
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

              {/* Marital Status */}
              <div>
                <label className="block font-medium">
                  Are you single or married? *
                </label>
                <select
                  className="mt-1 w-full border rounded px-3 py-2"
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

              {/* Coming With */}
              <div>
                <label className="block font-medium">
                  Would you be coming with child(ren) or with someone? *
                </label>
                <select
                  className="mt-1 w-full border rounded px-3 py-2"
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
                comingWithValue === "Coming with a Guest") && (
                <div>
                  <label className="block font-medium">
                    Please share their full name(s)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guest names separated by commas"
                    className="mt-1 w-full border rounded px-3 py-2"
                    {...register("guestNames")}
                  />
                </div>
              )}

              {/* Paying For Guest */}
              {comingWithValue === "Yes" && (
                <div>
                  <label className="block font-medium">
                    Would you be the one paying for them?
                  </label>
                  <select
                    className="mt-1 w-full border rounded px-3 py-2"
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
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Submit
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
