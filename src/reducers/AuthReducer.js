// The redux authentication reducer manages the state related to login (and logout) actions,
// on successful login the current user object and a loggedIn flag are stored in the authentication section of the application state.
import {userConstants} from "../constants/UserConstants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SIGNUP_BEGIN:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.SIGNUP_FAILURE:
      return {};
    case userConstants.LOGIN_BEGIN:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

// * FUTURE: add a error key to initialState
// * FUTURE: except for returning an exmpty {} return an error
//! change loggedIn and logginingIn to loading (true/false)