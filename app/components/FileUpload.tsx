"use client";

import React, { useState } from "react";

// Interface defining props for the FileInput component
// Extends input attributes while omitting the 'type' attribute
interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  labelText?: string; // Optional label text for the input
  onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional callback when file is selected
  error?: string; // Optional error message to display
  buttonText?: string; // Optional custom text for upload button
}

// FileInput component using forwardRef to allow ref forwarding
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
    // State to store the name of the selected file
    const [fileName, setFileName] = useState<string>("");

    // Handler for file selection event
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Get the first selected file
      const file = e.target.files?.[0];
      if (file) {
        // Update filename state
        setFileName(file.name);
        // Call original onChange handler if provided
        onChange?.(e);
        // Call onSelect handler if provided
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
        {/* File input wrapper with custom styling */}
        <label className="w-full relative border flex rounded-md cursor-pointer group overflow-hidden">
          <div className="inline-block h-full py-3 px-4 text-white transition-colors duration-200 bg-emerald-600 hover:bg-emerald-700 shadow-sm">
            <input
              className="hidden"
              ref={ref}
              onChange={handleFileChange}
              type="file"
              {...props}
            />
            {buttonText}
          </div>
          {/* Display selected filename or default text */}
          <span className="px-4 py-3 truncate text-gray-600">
            {fileName || "No file selected"}
          </span>
        </label>
        {/* Render error message if provided */}
        {error && (
          <p className="text-red-600 text-sm mt-1 animate-shake">{error}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
