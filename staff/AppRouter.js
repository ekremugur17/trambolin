import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Route from './components/routes';
import { connect } from 'react-redux';
import * as Font from 'expo-font';
import { loadUser, loadAssets } from './redux/actions';
console.disableYellowBox = true;

class AppRouter extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await this.props.loadUser();
    await this.props.loadAssets();
    await Font.loadAsync({
      Poppins: require('./assets/fonts/poppins.ttf'),
      'Poppins-Bold': require('./assets/fonts/poppins-bold.ttf'),
      'Poppins-Medium': require('./assets/fonts/poppins-medium.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? <Route /> : <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 0.6,
    zIndex: 9999
  }
});

export default connect(null, { loadUser, loadAssets })(AppRouter);