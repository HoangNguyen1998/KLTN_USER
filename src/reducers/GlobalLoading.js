import * as LoadingConstants from "constants/GlobalLoading";

const reducer = (state = { showLoading: false, showCircular: false }, action) => {
  switch (action.type) {
    case LoadingConstants.SHOW_LOADING:
      return { ...state, showLoading: true };
    case LoadingConstants.HIDE_LOADING:
      return { ...state, showLoading: false };
      case LoadingConstants.SHOW_CIRCULAR:
        return { ...state, showCircular: true };
      case LoadingConstants.HIDE_CIRCULAR:
        return { ...state, showCircular: false };
    default:
      return state;
  }
};

export default reducer;
