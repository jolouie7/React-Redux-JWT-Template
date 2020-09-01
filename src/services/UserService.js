// handles all http communication with backend apis for the application
import {authHeader} from "../helpers/Auth-Header";
import { history } from "../helpers/history";

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
  return fetch(`http://localhost:4000/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

export const getAll = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  //! Change this to the API location
  return fetch(`http://localhost:4000/users`, requestOptions).then(
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
