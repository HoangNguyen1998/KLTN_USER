import * as SigninConstants from "../constants/SignIn";

export const Signin_Error = error => {
  return {
    type: SigninConstants.SIGNIN_ERROR,
    payload: error
  };
};
export const Signin_Request = (data, history) => {
  return {
    type: SigninConstants.SIGNIN_REQUEST,
    payload: { data, history }
  };
};
export const Signin_Success = (success, remember) => {
  return {
    type: SigninConstants.SIGNIN_SUCCESS,
    payload: { success, remember }
  };
};
