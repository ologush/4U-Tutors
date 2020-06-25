import {
    SET_CURRENT_LESSON,
    LESSON_LOADING,
    BOOK_LESSON,
    ENTER_BOOKING
} from "./types";

export const setCurrentLesson = decoded => {
    return {
        type: SET_CURRENT_LESSON,
        payload: decoded
    };
};

export const endLesson = () => dispatch => {
    dispatch(setCurrentLesson({}));
};

export const enterBooking = decoded => dispatch => {
    dispatch({
        type: ENTER_BOOKING,
        payload: decoded
    });
};