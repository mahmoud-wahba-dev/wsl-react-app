import { toast } from "sonner";

const Toast = {
  success(message) {
    toast.success(message);
  },

  error(message) {
    toast.error(message);
  },

  warning(message) {
    toast.warning(message);
  },

  info(message) {
    toast.info(message);
  },

  loading(message) {
    return toast.loading(message);
  },

  dismiss(id) {
    toast.dismiss(id);
  },
};

export default Toast;
