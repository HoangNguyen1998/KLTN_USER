import { call, put, takeLatest, delay } from "redux-saga/effects";
import * as SignUpConstants from "constants/SignUp";
import * as SignUpActions from "actions/SignUp";
import * as LoadingActions from "actions/GlobalLoading";
import CheckError from "helpers/CheckError";
import CallApi from "helpers/ApiCaller";

function* SignUpFlow(user) {
  const { data, history, t, enqueueSnackbar } = user.payload;
  try {
    yield put(LoadingActions.ShowLoading());
    const res = yield call(CallApi, "users", "POST", data);
    console.log(res);
    const message = "Sign up success!";
    yield delay(1000);
    yield put(LoadingActions.HideLoading());
    enqueueSnackbar(t("SignUpSuccess"), { variant: "success" });
    history.push("/signin");
    yield put(SignUpActions.SignUpSuccess(message));
  } catch (err) {
    const { message, code } = err.response.data;
    yield delay(1000);
    yield put(LoadingActions.HideLoading());
    console.log(message);
    enqueueSnackbar(t(CheckError(message)), { variant: "error" });
    // yield put(SignUpActions.SignUpError(message));
  }
}
function* SignUpWatcher() {
  yield takeLatest(SignUpConstants.SIGNUP_REQUEST, SignUpFlow);
}

export default SignUpWatcher;
