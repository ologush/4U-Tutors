import {
    ENTER_BOOKING
} from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
    isBooking: false,
    posting: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ENTER_BOOKING:
            return {
                ...state,
                isBooking: !isEmpty(action.payload),
                posting: action.payload
            };
        default:
            return state;
    }
}