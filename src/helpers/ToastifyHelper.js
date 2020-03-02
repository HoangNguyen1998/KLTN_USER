import { toast } from "react-toastify";
export const ToastError = error => {
  toast.error(error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const ToastSuccess = success => {
  toast.success(success, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};
