// Assuming you have more then one reducer
import { combineReducers } from "redux";
import {alert} from "./AlertReducer";
import { authentication } from "./AuthReducer";
import { users } from "./UsersReducer";

export default combineReducers({
  alert,
  authentication,
  users
});
