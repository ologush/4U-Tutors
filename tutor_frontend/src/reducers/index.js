import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import lessonReducer from "./lessonReducer";
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    lesson: lessonReducer
});