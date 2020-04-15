import * as ChallengesConstants from "constants/Challenges";
import findIndex from "lodash/findIndex";

const reducer = (
    state = {
        challenges: {},
        challengeDetail: {}
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
                challenges: payload.result
            };
        }
        case ChallengesConstants.GET_ALL_CHALLENGES_ERROR: {
            return {...state};
        }
        case ChallengesConstants.GET_CHALLENGE_DETAILS_SUCCESS: {
            const { payload } = action;
            console.log(payload);
            return {
              ...state,
              challengeDetail: payload.result
            };
          }
        default:
            return {...state};
    }
};

export default reducer;
