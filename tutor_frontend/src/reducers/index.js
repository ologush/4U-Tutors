import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import lessonReducer from "./lessonReducer";
import bookingReducer from "./bookingReducer";
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    lesson: lessonReducer,
    booking: bookingReducer
});