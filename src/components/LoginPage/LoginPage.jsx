import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as userActions from "../../actions/UserActions";

const LoginPage = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    submitted: false,
  });

  // reset login status
  // this.props.dispatch(userActions.logout());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({ ...user, submitted: true });
    const { email, password } = user;
    const { dispatch } = props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  const { loggingIn } = props;
  const { email, password, submitted } = user;

  return (
    <div>
      <h2>Login</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div
          className={
            "form-group" + (submitted && !email ? " has-error" : "")
          }
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {submitted && !email && (
            <div className="help-block">Email is required</div>
          )}
        </div>
        <div
          className={
            "form-group" + (submitted && !password ? " has-error" : "")
          }
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {submitted && !password && (
            <div className="help-block">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button>Login</button>
          {loggingIn && (
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          )}
        </div>
      </form>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

export default connect(mapStateToProps)(LoginPage);