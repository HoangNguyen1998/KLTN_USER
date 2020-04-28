import * as AlphabetConstants from "constants/Alphabet";
import findIndex from "lodash/findIndex";

const reducer = (
    state = {
        alphabet: [],
        alphabetDetail: {},
    },
    action
) => {
    switch (action.type) {
        case AlphabetConstants.GET_ALL_ALPHABET_SUCCESS: {
            const {payload} = action;
            console.log(payload);
            return {
                ...state,
                alphabet: payload,
            };
        }
        // case AlphabetConstants.GET_ALPHABET_DETAILS_REQUEST: {
        //     return {
        //         ...state,
        //         alphabetDetail: {},
        //     };
        // }
        case AlphabetConstants.GET_ALPHABET_DETAILS_SUCCESS: {
            const {payload} = action;
            return {
                ...state,
                alphabetDetail: payload,
            };
        }
        default:
            return {...state};
    }
};

export default reducer;
