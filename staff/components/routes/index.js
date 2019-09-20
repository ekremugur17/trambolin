import React, { Component } from 'react'
import { connect } from 'react-redux';
import AppNavigator from './AppNavigator';
class Route extends Component {
  render() {
    return (
      <AppNavigator screenProps={{ avatar: this.props.avatar }} dash={false} />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    avatar: auth.user ? auth.user.avatar : null
  }
}

export default connect(mapStateToProps)(Route);