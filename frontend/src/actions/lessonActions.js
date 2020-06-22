import {
    SET_CURRENT_LESSON,
    LESSON_LOADING
} from './types';

export const setCurrentLesson = decoded => {
    return {
        type: SET_CURRENT_LESSON,
        payload: decoded
    };
};

export const endLesson = () => dispatch => {
    dispatch(setCurrentLesson({}));
};