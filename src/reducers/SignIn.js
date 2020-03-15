import * as SignInConstants from "constants/SignIn";
import { ToastSuccess, ToastError } from "helpers/ToastifyHelper";
import GetToken from "helpers/GetToken";
const initialState = {
  user: {}
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SignInConstants.SIGNIN_REQUEST: {
      return {
        ...state
      };
    }
    case SignInConstants.SIGNIN_SUCCESS: {
      console.log("chay")
      const { success, remember, enqueueSnackbar, t } = action.payload;
      const { token } = success;
      var now = new Date();
      now.setTime(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      if (remember === true) {
        document.cookie = `token=${token};expires=${now.toUTCString()}`;
      } else {
        document.cookie = `token=${token}`;
      }
      // GetToken();
      return {
        ...state,
        user: action.payload
      };
    }
    case SignInConstants.SIGNIN_ERROR: {
      ToastError(action.payload);
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
