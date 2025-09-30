// components/Toast.tsx
import { toast, ToastContainer } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning";

interface ShowToastProps {
  message: string;
  type?: ToastType;
  duration?: number; // autoClose time in ms
  id?: string; // unique key (e.g. product id) to avoid spam
}

const toastCooldown: Record<string, number> = {}; // track last toast time
const COOLDOWN = 1500; // 1.5s per message

// ✅ Helper function to show toast with cooldown
export const showToast = ({ message, type = "info", duration = 3000, id }: ShowToastProps) => {
  const now = Date.now();
  const key = id || message; // use product id if available, else message text

  if (toastCooldown[key] && now - toastCooldown[key] < COOLDOWN) {
    return; // skip toast if still in cooldown
  }

  toastCooldown[key] = now;

  const options: ToastOptions = {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    default:
      toast.info(message, options);
  }
};

// ✅ ToastContainer provider
export const ToastProvider = () => {
  return <ToastContainer />;
};
