import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
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
      className={`bg-white rounded-lg shadow-md ${className} grid grid-cols-1 md:grid-cols-3 gap-3 p-2`}
    >
      <div className="flex flex-col">
        <label className="mb-1">Contact Name</label>
        <input
          {...register("contact.name")}
          className={`border rounded-md p-2 ${
            errors.contact?.name ? "border-red-500" : "border-gray-300"
          }`}
          defaultValue={getValues("contact.name")}
        />
        {errors.contact?.name && (
          <span className="text-red-500 text-sm">
            {errors.contact?.name?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Phone</label>
        <input
          {...register("contact.phone")}
          className={`border rounded-md p-2 ${
            errors.contact?.phone ? "border-red-500" : "border-gray-300"
          }`}
          defaultValue={getValues("contact.phone")}
        />
        {errors.contact?.phone && (
          <span className="text-red-500 text-sm">
            {errors.contact?.phone?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Email</label>
        <input
          {...register("contact.email")}
          className={`border rounded-md p-2 ${
            errors.contact?.email ? "border-red-500" : "border-gray-300"
          }`}
          defaultValue={getValues("contact.email")}
        />
        {errors.contact?.email && (
          <span className="text-red-500 text-sm">
            {errors.contact?.email?.message}
          </span>
        )}
      </div>

      <div className="flex justify-center col-span-3 gap-3">
        <button
          className="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-md px-4 py-2 w-36 hover:bg-blue-600"
          onClick={prev}
        >
          <ChevronLeftIcon className="w-6" />
          Previous
        </button>
        <button
          className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-md px-4 py-2 w-36 hover:bg-green-600"
          type="submit"
        >
          Save
          <PlusCircleIcon className="w-6" />
        </button>
      </div>
    </div>
  );
};

export default Contact;
