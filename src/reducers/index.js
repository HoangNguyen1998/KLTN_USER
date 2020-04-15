import {combineReducers} from "redux";
import SignInReducer from "./SignIn";
import SignUpReducer from "./SignUp";
import LoadingReducer from "./GlobalLoading";
import CoursesReducer from "./Courses";
import GetMeReducer from "./GetMe";
import ChallengesReducer from './Challenges'

const rootReducer = combineReducers({
    SignIn: SignInReducer,
    SignUp: SignUpReducer,
    Loading: LoadingReducer,
    Courses: CoursesReducer,
    GetMe: GetMeReducer,
    Challenges: ChallengesReducer
});

export default rootReducer;
