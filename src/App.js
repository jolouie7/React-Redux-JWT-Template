import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
// Custom Imports
import {history} from "./helpers/history";
import * as alertActions from "./actions/AlertActions";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";

const App = (props) => {
  const { dispatch } = props;
  history.listen((location, action) => {
    // clear alert on location change
    dispatch(alertActions.clear());
  });

  const { alert } = props;
  return (
    <div>
      {/* {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )} */}
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  alert: state.alert,
})

export default connect(mapStateToProps)(App);
