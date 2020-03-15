import * as SignUpConstants from "constants/SignUp";

export const SignUpError = error => {
  return {
    type: SignUpConstants.SIGNUP_ERROR,
    payload: error
  };
};
export const SignUpRequest = (data, history, t, enqueueSnackbar) => {
  console.log("run into signupAction!");
  return {
    type: SignUpConstants.SIGNUP_REQUEST,
    payload: { data, history, t, enqueueSnackbar }
  };
};
export const SignUpSuccess = success => {
  return {
    type: SignUpConstants.SIGNUP_SUCCESS,
    payload: success
  };
};
