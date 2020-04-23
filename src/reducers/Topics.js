import * as TopicsConstants from "constants/Topics";
import findIndex from "lodash/findIndex";
import * as GetMeConstants from "constants/GetMe";

const reducer = (
    state = {
        topics: [],
        topicDetail: [],
    },
    action
) => {
    switch (action.type) {
        case TopicsConstants.GET_TOPICS_REQUEST: {
            return {...state};
        }
        case TopicsConstants.GET_TOPICS_SUCCESS: {
            const {payload} = action;
            const dataReverse = payload.reverse();
            console.log(payload);
            console.log(dataReverse);
            return {
                ...state,
                topics: payload,
            };
        }
        case TopicsConstants.GET_TOPICS_ERROR: {
            return {...state};
        }
        case GetMeConstants.SIGN_OUT:
            return {...state, topics: [], topicDetail: []};
        default:
            return {...state};
    }
};

export default reducer;
