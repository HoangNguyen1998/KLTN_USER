import * as AlphabetConstants from "constants/Alphabet";

export const Get_All_Alphabet_Request = (data) => {
    return {
        type: AlphabetConstants.GET_ALL_ALPHABET_REQUEST,
        payload: data,
    };
};

export const Get_All_Alphabet_Error = (errors) => {
    return {
        type: AlphabetConstants.GET_ALL_ALPHABET_ERROR,
        payload: errors,
    };
};

export const Get_All_Alphabet_Success = (success) => {
    return {
        type: AlphabetConstants.GET_ALL_ALPHABET_SUCCESS,
        payload: success,
    };
};

export const Get_Alphabet_Detail_Request = (id, isLoading) => {
    return {
        type: AlphabetConstants.GET_ALPHABET_DETAILS_REQUEST,
        payload: {id, isLoading},
    };
};

export const Get_Alphabet_Detail_Error = (errors) => {
    return {
        type: AlphabetConstants.GET_ALPHABET_DETAILS_ERROR,
        payload: errors,
    };
};

export const Get_Alphabet_Detail_Success = (success) => {
    return {
        type: AlphabetConstants.GET_ALPHABET_DETAILS_SUCCESS,
        payload: success,
    };
};
