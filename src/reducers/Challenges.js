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
                listComment: [],
                challengeDetail: payload.result,
            };
        }
        case ChallengesConstants.GET_COMMENTS_SUCCESS: {
            const {payload} = action;
            const list = [...state.listComment];
            const index = list.findIndex((item) => item._id === payload[0]._id);
            list.splice(index, 1, payload[0]);
            if (index === -1) {
                return {
                    ...state,
                    listComment: [...state.listComment, ...payload],
                };
            } else {
                return {...state, listComment: list};
            }
        }
        default:
            return {...state};
    }
};

export default reducer;
