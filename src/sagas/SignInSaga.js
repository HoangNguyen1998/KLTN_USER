import {call, put, takeLatest, delay} from "redux-saga/effects";
import * as SignInConstants from "constants/SignIn";
import * as LoadingActions from "actions/GlobalLoading";
import * as GetMeActions from "actions/GetMe";
import * as SignInActions from "actions/SignIn";
import * as SocketActions from 'actions/Socket'
import CallApi from "helpers/ApiCaller";

function* SignInFlow(user) {
    const {history, enqueueSnackbar, t} = user.payload;
    try {
        yield put(LoadingActions.ShowLoading());
        const {username, password, remember} = user.payload.data;
        const userdetail = {username: username, password: password};
        const res = yield call(CallApi, "users/login", "POST", userdetail);
        const {data} = res;
        console.log(data)
        yield put(GetMeActions.Get_Me_Success(data.result));
        yield put(SignInActions.SignIn_Success(data.result, remember));
        yield delay(500);
        yield put(LoadingActions.HideLoading());
        yield put(SocketActions.Connect_Socket())
        history.push("/");
        enqueueSnackbar(t("SignInSuccess"), {variant: "success"});
    } catch (err) {
        // const { message } = err.response.data;
        console.log(err);
        yield delay(500);
        yield put(LoadingActions.HideLoading());
        yield put(SignInActions.SignIn_Error(err, t));
        enqueueSnackbar(t("SignInFail"), {variant: "error"});
    }
}
function* SignInWatcher() {
    yield takeLatest(SignInConstants.SIGNIN_REQUEST, SignInFlow);
}

export default SignInWatcher;
