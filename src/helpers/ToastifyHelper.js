import { toast } from "react-toastify";
export const toastError = error => {
  toast.error(error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const toastSuccess = success => {
  toast.success(success, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};
