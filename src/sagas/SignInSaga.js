import { call, put, takeLatest, delay } from "redux-saga/effects";
import * as SignInConstants from "constants/SignIn";
import * as LoadingActions from "actions/GlobalLoading";
import * as SignInActions from "actions/SignIn";
import CallApi from "helpers/ApiCaller";

function* SignInFlow(user) {
  const { history, enqueueSnackbar, t } = user.payload;
  try {
    yield put(LoadingActions.ShowLoading());
    const { username, password, remember } = user.payload.data;
    const userdetail = { username: username, password: password };
    const res = yield call(CallApi, "users/login", "POST", userdetail);
    const { data } = res;
    console.log(data);
    yield put(SignInActions.SignIn_Success(data, remember));
    yield delay(1000);
    yield put(LoadingActions.HideLoading());
    enqueueSnackbar(t("SignInSuccess"), { variant: "success" });
    history.push("/");
  } catch (err) {
    // const { message } = err.response.data;
    console.log(err);
    yield delay(1000);
    yield put(LoadingActions.HideLoading());
    yield put(SignInActions.SignIn_Error(err, t));
    enqueueSnackbar(t("SignInFail"), { variant: "error" });
  }
}
function* SignInWatcher() {
  yield takeLatest(SignInConstants.SIGNIN_REQUEST, SignInFlow);
}

export default SignInWatcher;
