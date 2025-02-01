"use client";

import React, { useState } from "react";

interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelText?: string;
  onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  buttonText?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      labelText,
      onChange,
      onSelect,
      error,
      buttonText = "Upload File",
      ...props
    },
    ref
  ) => {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name);
        onChange?.(e);
        onSelect?.(e);
      }
    };

    return (
      <div className={className}>
        {labelText && (
          <label
            className="block text-gray-600 text-xs lg:text-sm xl:text-base mb-2"
            htmlFor={props.id}
          >
            {labelText}
          </label>
        )}
        <label className="w-full relative border flex rounded-md cursor-pointer group overflow-hidden">
          <div className="inline-block h-full py-3 px-4 text-white transition-colors duration-200 bg-teal-600 hover:bg-teal-700 shadow-sm">
            <input
              className="hidden"
              ref={ref}
              onChange={handleFileChange}
              type="file"
              {...props}
            />
            {buttonText}
          </div>
          <span className="px-4 py-3 truncate text-gray-600">
            {fileName || "No file selected"}
          </span>
        </label>
        {error && (
          <p className="text-red-600 text-sm mt-1 animate-shake">{error}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
