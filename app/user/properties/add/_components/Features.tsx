import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";

interface Props {
  next: () => void;
  prev: () => void;
  className?: string;
}

const Features = (props: Props) => {
  const {
    register,
    formState: { errors },
    control,
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (
      await trigger([
        "propertyFeature.area",
        "propertyFeature.bathrooms",
        "propertyFeature.bedrooms",
        "propertyFeature.parkingSpots",
      ])
    )
      props.next();
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 ${props.className}`}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bedrooms
        </label>
        <input
          {...register("propertyFeature.bedrooms")}
          defaultValue={getValues().propertyFeature?.bedrooms?.toString()}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.propertyFeature?.bedrooms && (
          <p className="text-red-500 text-xs">
            {errors.propertyFeature?.bedrooms?.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bathrooms
        </label>
        <input
          {...register("propertyFeature.bathrooms")}
          defaultValue={getValues().propertyFeature?.bathrooms?.toString()}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.propertyFeature?.bathrooms && (
          <p className="text-red-500 text-xs">
            {errors.propertyFeature?.bathrooms?.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Parking Spots
        </label>
        <input
          {...register("propertyFeature.parkingSpots")}
          defaultValue={getValues().propertyFeature?.parkingSpots?.toString()}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.propertyFeature?.parkingSpots && (
          <p className="text-red-500 text-xs">
            {errors.propertyFeature?.parkingSpots?.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Area</label>
        <input
          {...register("propertyFeature.area")}
          defaultValue={getValues().propertyFeature?.area?.toString()}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.propertyFeature?.area && (
          <p className="text-red-500 text-xs">
            {errors.propertyFeature?.area?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 col-span-2">
        <Controller
          control={control}
          name="propertyFeature.hasSwimmingPool"
          render={({ field }) => (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...field}
                defaultChecked={getValues().propertyFeature?.hasSwimmingPool}
              />
              <span>Has Swimming Pool</span>
            </label>
          )}
        />

        <Controller
          control={control}
          name="propertyFeature.hasGardenYard"
          render={({ field }) => (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...field}
                defaultChecked={getValues().propertyFeature?.hasGardenYard}
              />
              <span>Has Garden/Yard</span>
            </label>
          )}
        />

        <Controller
          control={control}
          name="propertyFeature.hasBalcony"
          render={({ field }) => (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...field}
                defaultChecked={getValues().propertyFeature?.hasBalcony}
              />
              <span>Has Balcony</span>
            </label>
          )}
        />
      </div>

      <div className="flex justify-center col-span-2 gap-3">
        <button
          onClick={props.prev}
          className="flex items-center justify-center w-36 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <FaChevronLeft className="w-5 mr-2" /> Previous
        </button>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-36 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Next <FaChevronRight className="w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Features;
