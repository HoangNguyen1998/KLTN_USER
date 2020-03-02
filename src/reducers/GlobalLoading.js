import * as LoadingConstants from "../constants/GlobalLoading";

const reducer = (state = { showLoading: false }, action) => {
  switch (action.type) {
    case LoadingConstants.SHOW_LOADING:
      return { ...state, showLoading: true };
    case LoadingConstants.HIDE_LOADING:
      return { ...state, showLoading: false };
    default:
      return state;
  }
};

export default reducer;
