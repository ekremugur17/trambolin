import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return this.props.isAuthenticated ? <Redirect to="/app" /> : <Redirect to="/user" />;
  }
}

const mapStateToProps = ({ auth }) => (
  {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.loading
  }
)

export default connect(mapStateToProps)(Main);
