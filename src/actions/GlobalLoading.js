import * as LoadingConstants from "constants/GlobalLoading";

export const ShowLoading = () => {
  return {
    type: LoadingConstants.SHOW_LOADING
  };
};

export const HideLoading = () => {
  return {
    type: LoadingConstants.HIDE_LOADING
  };
};

export const ShowCirCular=()=>{
  return {
    type: LoadingConstants.SHOW_CIRCULAR
  }
}

export const HideCirCular=()=>{
  return {
    type: LoadingConstants.HIDE_CIRCULAR
  }
}