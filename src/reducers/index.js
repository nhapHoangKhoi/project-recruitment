import { combineReducers } from "redux"; // this method combines all reducers into "one"
import { authenReducer } from "./authen.js";

export const allReducers = combineReducers({
   authenReducer,
   // add more reducers here
});