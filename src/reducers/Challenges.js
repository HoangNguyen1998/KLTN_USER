import * as ChallengesConstants from "constants/Challenges";
import findIndex from "lodash/findIndex";
import socketIOClient from "socket.io-client";
import getToken from "helpers/CheckToken";
let socket = socketIOClient.connect("https://jp-server-kltn.herokuapp.com/", {
    query: "token=" + getToken(),
});

const reducer = (
    state = {
        challenges: {},
        challengeDetail: {},
        listComment: [],
    },
    action
) => {
    switch (action.type) {
        case ChallengesConstants.GET_ALL_CHALLENGES_REQUEST: {
            return {...state};
        }
        case ChallengesConstants.GET_ALL_CHALLENGES_SUCCESS: {
            const {payload} = action;
            return {
                ...state,
                challenges: payload.result,
            };
        }
        case ChallengesConstants.GET_ALL_CHALLENGES_ERROR: {
            return {...state};
        }
        case ChallengesConstants.GET_CHALLENGE_DETAILS_SUCCESS: {
            const {payload} = action;
            return {
                ...state,
                challengeDetail: payload.result,
            };
        }
        case ChallengesConstants.GET_COMMENTS_SUCCESS: {
            const {payload} = action;
            console.log(payload)
            const list = [...state.listComment]
            return {...state, listComment: [...state.listComment, ...payload]};
        }
        default:
            return {...state};
    }
};

export default reducer;
