import {
    FAILED_REQUEST,
    FETCH_STUDENTS,
    MAKE_REQUEST,
    ADD_STUDENT,
    SET_RESPONSE_SUCCESS,
    DELETE_STUDENT,
    UPDATE_STUDENT,
    GET_STUDENT_DETAILS_BY_ID
} from "./actionTypes";

const initialState = {
    loading: true,
    studentsList: [],
    errorMessage: '',
    responseMessage: {
        message: '',
        isError: false
    },
    responseSuccess: false,
    isError: false,
    studentDetails: {},
    
}
export const studentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS:
            return {
                ...state,
                loading: false,
                studentsList: action.payload
            }
        case FAILED_REQUEST:
            return {
                loading: false,
                isError: true,
                errorMessage: action.payload,
                responseSuccess: true
            }
        case ADD_STUDENT:
            return {
                ...state,
                loading: false,
                responseMessage: action.payload.responseMessage,
                isError: action.payload.isError,
                responseSuccess: true
            }
        // case SET_RESPONSE_SUCCESS:
        //     return {
        //         responseSuccess: action.payload
        //     }
        case DELETE_STUDENT:
            return {
                ...state,
                loading: false,
                responseMessage: action.payload.responseMessage,
                isError: action.payload.isError,
                responseSuccess: true
            }
        case UPDATE_STUDENT:
            return {
                ...state,
                loading: false,
                responseMessage: action.payload.responseMessage,
                responseSuccess: true,
                isError: action.payload.isError
            }
        case GET_STUDENT_DETAILS_BY_ID:
            return {
                ...state,
                loading: false,
                studentDetails: action.payload
            }

        default:
            return state;
    }
}