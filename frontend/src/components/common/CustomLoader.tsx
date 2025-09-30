import React, { forwardRef, useImperativeHandle, useState } from "react";

export type CustomLoaderRefType = {
  start: () => void;
  stop: () => void;
};

type CustomLoaderProps = {
  text?: string;
};

const CustomLoader = forwardRef<CustomLoaderRefType, CustomLoaderProps>(({ text = "Please wait..." }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    start: () => setVisible(true),
    stop: () => setVisible(false),
  }));

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 z-50">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      <p className="mt-4 text-white text-sm">{text}</p>
    </div>
  );
});

export default CustomLoader;
