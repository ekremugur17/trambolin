import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "../../layout/AppLayout";
import welcome from "./welcome";
import staff from "./staff";
import finance from "./finance";
import credits from './credits';
import box from "./box";
import Alert from '../../components/Alert';

class App extends Component {
  render() {
    const { match } = this.props;
    if (!this.props.isAuthenticated) {
      return <Redirect to="/user" />
    } else if (this.props.image2URL === '' || !this.props.image2URL) {
      return <Redirect to="/complete" />
    }
    return (
      <AppLayout>
        <Alert />
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/welcome`} />
          <Route path={`${match.url}/welcome`} component={welcome} />
          <Route path={`${match.url}/credits`} component={credits} />
          <Route path={`${match.url}/staff`} component={staff} />
          <Route path={`${match.url}/finance`} component={finance} />
          <Route path={`${match.url}/box`} component={box} />
          <Redirect to="/error" />
        </Switch>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu, auth }) => {
  const { containerClassnames } = menu;
  const isAuthenticated = auth.isAuthenticated;
  const image2URL = auth.user ? auth.user.image2URL : null;
  return { containerClassnames, isAuthenticated, image2URL };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
