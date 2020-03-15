import { combineReducers } from "redux";
import SignInReducer from "./SignIn";
import SignUpReducer from "./SignUp";
import LoadingReducer from "./GlobalLoading";
import CoursesReducer from "./Courses";

const rootReducer = combineReducers({
  SignIn: SignInReducer,
  SignUp: SignUpReducer,
  Loading: LoadingReducer,
  Courses: CoursesReducer
});

export default rootReducer;
