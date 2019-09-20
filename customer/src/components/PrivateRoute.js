import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/user/login' />) : (<Component {...props} />)} />
)

const mapStateToProps = ({ auth }) => (
  {
    auth
  }
)

export default connect(mapStateToProps, {})(PrivateRoute);
