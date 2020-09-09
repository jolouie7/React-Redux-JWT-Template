import {userConstants} from "../constants/UserConstants";
import * as userService from "../services/UserService";
import * as alertActions from "./AlertActions";
import {history} from "../helpers/history";

export const login = (username, password) => {
  console.log("username:", username)
  console.log("password:", password)
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        console.log(user)
        dispatch(success(user));
        history.push("/");
        window.location.reload(true);
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_BEGIN, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

export const signup = (username, email, password, password_confirmation) => {
  return (dispatch) => {
    // debugger
    dispatch(request({ username }));

    userService
      .signup(username, email, password, password_confirmation)
      .then(
        (user) => {
          dispatch(success(user));
          history.push("/");
          window.location.reload(true);
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) {
    return { type: userConstants.SIGNUP_BEGIN, user };
  }
  function success(user) {
    return { type: userConstants.SIGNUP_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SIGNUP_FAILURE, error };
  }
};

export const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export const getAll = () => {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GETALL_BEGIN };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}