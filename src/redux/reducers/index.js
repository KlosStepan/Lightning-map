import { combineReducers } from "redux";
import { lightningMapReducer } from "./lightningMapReducer";

const reducers = combineReducers({
    allReducers: lightningMapReducer
})
export default reducers