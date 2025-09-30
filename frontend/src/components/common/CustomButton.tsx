// components/common/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  let baseClasses =
    "px-3 py-1 rounded transition focus:outline-none active:scale-95";

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700";
      break;
    case "secondary":
      variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400";
      break;
    case "danger":
      variantClasses = "bg-red-500 text-white hover:bg-red-600 active:bg-red-700";
      break;
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
