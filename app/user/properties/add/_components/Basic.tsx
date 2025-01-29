import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useFormContext } from "react-hook-form";
import { PropertyStatus, PropertyType } from "@prisma/client";
import { AddPropertyInputType } from "./AddPropertyForm";

interface Props {
  className?: string;
  types: PropertyType[];
  statuses: PropertyStatus[];
  next: () => void;
}

const Basic = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<AddPropertyInputType>();

  const handleNext = async () => {
    if (await trigger(["name", "description", "typeId", "statusId", "price"])) {
      props.next();
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md ${props.className}`}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Property Name"
          />
          {errors.name && (
            <span className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Property Description"
          />
          {errors.description && (
            <span className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            {...register("typeId")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={getValues().typeId?.toString()}
          >
            <option value="">Select Type</option>
            {props.types.map((item) => (
              <option key={item.id} value={item.id?.toString()}>
                {item.value}
              </option>
            ))}
          </select>
          {errors.typeId && (
            <span className="text-sm text-red-500 mt-1">
              {errors.typeId.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            {...register("statusId")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={getValues().statusId?.toString()}
          >
            <option value="">Select Status</option>
            {props.statuses.map((item) => (
              <option key={item.id} value={item.id?.toString()}>
                {item.value}
              </option>
            ))}
          </select>
          {errors.statusId && (
            <span className="text-sm text-red-500 mt-1">
              {errors.statusId.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            {...register("price")}
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
          {errors.price && (
            <span className="text-sm text-red-500 mt-1">
              {errors.price.message}
            </span>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 md:col-span-3">
          <button
            disabled
            className="flex items-center justify-center w-36 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-36 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Next
            <ChevronRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basic;
