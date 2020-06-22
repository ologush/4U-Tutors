import {
    SET_CURRENT_LESSON,
    LESSON_LOADING
} from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
    isLesson: false,
    lesson: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_LESSON:
            return {
                ...state,
                isLesson: !isEmpty(action.payload),
                lesson: action.payload
            };
        case LESSON_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}