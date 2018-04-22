import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import article from "./article";

export default combineReducers({
  routing: routerReducer,
  article
});
