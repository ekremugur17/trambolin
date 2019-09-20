import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";
import welcome from "./welcome";
import codes from './codes';

class App extends Component {
  render() {
    const { match } = this.props;
    if (!this.props.isAuthenticated) {
      return <Redirect to="/user" />
    }
    return (
      <AppLayout>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/welcome`} />
          <Route path={`${match.url}/welcome`} component={welcome} />
          <Route path={`${match.url}/codes`} component={codes} />
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu, auth }) => {
  const { containerClassnames } = menu;
  const isAuthenticated = auth.isAuthenticated;
  return { containerClassnames, isAuthenticated };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
