import * as SignInConstants from "constants/SignIn";

export const SignIn_Error = error => {
  return {
    type: SignInConstants.SIGNIN_ERROR,
    payload: { error }
  };
};
export const SignIn_Request = (data, history, enqueueSnackbar, t) => {
  console.log("dung useDispatch thanh cong: ", history);
  return {
    type: SignInConstants.SIGNIN_REQUEST,
    payload: { data, history, enqueueSnackbar, t }
  };
};
export const SignIn_Success = (success, remember) => {
  return {
    type: SignInConstants.SIGNIN_SUCCESS,
    payload: { success, remember }
  };
};
