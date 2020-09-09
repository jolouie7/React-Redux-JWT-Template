// handles all http communication with backend apis for the application
import {authHeader} from "../helpers/Auth-Header";
// import { history } from "../helpers/history";

// export const userService = {
//   login,
//   logout,
//   getAll,
// };

export const login = (username, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  //! Change this to the API location
  // return fetch(`http://localhost:4000/users/authenticate`, requestOptions)
  return fetch(`http://127.0.0.1:8000/dj-rest-auth/login/`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // debugger
      localStorage.setItem("token", JSON.stringify(user.access_token));
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user.user));
      // localStorage.parse("user")

      return user.user;
    });
}

export const signup = (username, email, password, password_confirmation) => {
  const password1 = password;
  const password2 = password_confirmation;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password1,
      password2,
    }),
  };

  //! Change this to the API location
  return fetch(
    `http://127.0.0.1:8000/dj-rest-auth/registration/`,
    requestOptions
  )
    .then(handleResponse)
    .then((user) => {
      console.log(user)
      localStorage.setItem("token", JSON.stringify(user.access_token));
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user.user));

      return user;
    });
};

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  // remove token from local storage
  localStorage.removeItem("token");
}

export const getAll = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  //! Change this to the API location
  return fetch(`http://127.0.0.1:8000/dj-rest-auth/user/`, requestOptions).then(
    handleResponse
  );
}

// checks if the http response from the api is 401 Unauthorized and automatically logs the user out.
const handleResponse = (response) => {

  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
        // history.push("/");
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
