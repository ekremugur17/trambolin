import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class Main extends Component {
  render() {
    return this.props.isAuthenticated ? this.props.img2URL && this.props.image2URL !== '' ? <Redirect to="/app" /> : <Redirect to="/complete" /> : <Redirect to="/user" />;
  }
}

const mapStateToProps = ({ auth }) => (
  {
    isAuthenticated: auth.isAuthenticated,
    isValidated: auth.user.validation,
    isLoading: auth.loading
  }
)

export default connect(mapStateToProps)(Main);
