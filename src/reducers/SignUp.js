import * as SignUpConstants from "../constants/SignUp";
import { ToastSuccess, ToastError } from "../helpers/ToastifyHelper";
const initialState = {
  history: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SignUpConstants.SIGNUP_REQUEST: {
      return {
        ...state,
        history: action.payload.history
      };
    }
    case SignUpConstants.SIGNUP_SUCCESS: {
      ToastSuccess(action.payload);
      return { ...state };
    }
    case SignUpConstants.SIGNUP_ERROR: {
      ToastError(action.payload);
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
