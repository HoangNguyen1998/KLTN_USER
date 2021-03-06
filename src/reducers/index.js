import {combineReducers} from "redux";
import SignInReducer from "./SignIn";
import SignUpReducer from "./SignUp";
import LoadingReducer from "./GlobalLoading";
import CoursesReducer from "./Courses";
import GetMeReducer from "./GetMe";
import ChallengesReducer from "./Challenges";
import TopicsReducer from "./Topics";
import FriendsReducer from "./Friends";
import SocketReducer from "./Socket";
import VideoReducer from "./Video";
import AlphabetReducer from "./Alphabet";
import TimerReducer from "./Timer";
import MessagesReducer from './Messages'
import NotificationReducer from './Notification'

const rootReducer = combineReducers({
    SignIn: SignInReducer,
    SignUp: SignUpReducer,
    Loading: LoadingReducer,
    Courses: CoursesReducer,
    GetMe: GetMeReducer,
    Challenges: ChallengesReducer,
    Topics: TopicsReducer,
    Friends: FriendsReducer,
    Socket: SocketReducer,
    Alphabet: AlphabetReducer,
    Video: VideoReducer,
    Timer: TimerReducer,
    Messages: MessagesReducer,
    Notification: NotificationReducer
});

export default rootReducer;
