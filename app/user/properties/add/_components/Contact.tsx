import { FaChevronLeft, FaCheck } from "react-icons/fa";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";

interface Props {
  prev: () => void;
  className?: string;
}

const Contact = ({ prev, className }: Props) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<AddPropertyInputType>();

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 gap-3 p-4 border rounded-lg shadow ${className}`}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact Name
        </label>
        <input
          {...register("contact.name")}
          defaultValue={getValues("contact.name")}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            errors.contact?.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact?.name && (
          <p className="text-red-500 text-xs">{errors.contact.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          {...register("contact.phone")}
          defaultValue={getValues("contact.phone")}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            errors.contact?.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact?.phone && (
          <p className="text-red-500 text-xs">{errors.contact.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("contact.email")}
          defaultValue={getValues("contact.email")}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            errors.contact?.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact?.email && (
          <p className="text-red-500 text-xs">{errors.contact.email.message}</p>
        )}
      </div>

      <div className="flex justify-center col-span-3 gap-3 mt-4">
        <button
          onClick={prev}
          className="flex items-center justify-center w-36 px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none"
        >
          <FaChevronLeft className="w-6 mr-2" /> Previous
        </button>
        <button
          type="submit"
          className="flex items-center justify-center w-36 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
        >
          Save <FaCheck className="w-6 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Contact;
