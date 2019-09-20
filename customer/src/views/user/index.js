import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";
import { connect } from 'react-redux';

import login from "./login";
import register from "./register";
import register2 from "./register2";
import forgotPassword from "./forgot-password";

const User = ({ match, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/app" />
  }
  return (
    <UserLayout>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
        <Route path={`${match.url}/login`} component={login} />
        <Route path={`${match.url}/register`} component={register} />
        <Route path={`${match.url}/register2`} component={register2} />
        <Route
          path={`${match.url}/forgot-password`}
          component={forgotPassword}
        />
        <Redirect to="/error" />
      </Switch>
    </UserLayout>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(User);
