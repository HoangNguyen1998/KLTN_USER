import * as SignUpConstants from "constants/SignUp";
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
      return { ...state };
    }
    case SignUpConstants.SIGNUP_ERROR: {
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
