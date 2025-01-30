import React from "react";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}

const Location = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (
      await trigger([
        "location.streetAddress",
        "location.city",
        "location.state",
        "location.zip",
        "location.region",
      ])
    ) {
      props.next();
    }
  };

  return (
    <div
      className={`bg-white border rounded-lg shadow-md p-6 ${props.className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Street Address</label>
          <input
            {...register("location.streetAddress")}
            className={`w-full p-2 border rounded-md ${
              errors.location?.streetAddress
                ? "border-red-500"
                : "border-gray-300"
            }`}
            defaultValue={getValues().location?.streetAddress}
          />
          {errors.location?.streetAddress && (
            <span className="text-sm text-red-500">
              {errors.location.streetAddress.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Zip/Postal Code</label>
          <input
            {...register("location.zip")}
            className={`w-full p-2 border rounded-md ${
              errors.location?.zip ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue={getValues().location?.zip}
          />
          {errors.location?.zip && (
            <span className="text-sm text-red-500">
              {errors.location.zip.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">City</label>
          <input
            {...register("location.city")}
            className={`w-full p-2 border rounded-md ${
              errors.location?.city ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue={getValues().location?.city}
          />
          {errors.location?.city && (
            <span className="text-sm text-red-500">
              {errors.location.city.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">State</label>
          <input
            {...register("location.state")}
            className={`w-full p-2 border rounded-md ${
              errors.location?.state ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue={getValues().location?.state}
          />
          {errors.location?.state && (
            <span className="text-sm text-red-500">
              {errors.location.state.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 col-span-2">
          <label className="text-sm font-medium">Region/Neighborhood</label>
          <input
            {...register("location.region")}
            className={`w-full p-2 border rounded-md ${
              errors.location?.region ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue={getValues().location?.region}
          />
          {errors.location?.region && (
            <span className="text-sm text-red-500">
              {errors.location.region.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 col-span-2">
          <label className="text-sm font-medium">Landmarks</label>
          <textarea
            {...register("location.landmark")}
            className={`w-full p-2 border rounded-md ${
              errors.location?.landmark ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue={getValues().location?.landmark}
            rows={4}
          />
          {errors.location?.landmark && (
            <span className="text-sm text-red-500">
              {errors.location.landmark.message}
            </span>
          )}
        </div>

        <div className="flex justify-center col-span-2 gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md w-36 justify-center hover:bg-teal-700"
            onClick={props.prev}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Previous
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md w-36 justify-center hover:bg-teal-700"
            onClick={handleNext}
          >
            Next
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location;
