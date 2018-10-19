import { combineReducers } from "redux";
import authReducer from "./authReducer";
import weatherReducer from "./weatherReducer";
import newsReducer from "./newsReducer";

export default combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  news: newsReducer
});
