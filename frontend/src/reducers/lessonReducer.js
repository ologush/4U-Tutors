import {
    SET_CURRENT_LESSON,
    LESSON_LOADING
} from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
    loading: false,
    lesson: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_LESSON:
            return {
                ...state,
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