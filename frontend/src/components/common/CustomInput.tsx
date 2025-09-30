import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";

interface CustomInputProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
  error,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder || label}
            className={`w-full p-2 border rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CustomInput;
