"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ className, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      className={`px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 ${className}`}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default SubmitButton;
