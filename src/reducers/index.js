import { combineReducers } from "redux";
import SignInReducer from "./SignIn";
import SignUpReducer from "./SignUp";
import LoadingReducer from "./GlobalLoading";

const rootReducer = combineReducers({
  SignIn: SignInReducer,
  SignUp: SignUpReducer,
  Loading: LoadingReducer
});

export default rootReducer;
