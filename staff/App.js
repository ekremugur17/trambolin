import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AppRouter from './AppRouter';
import store from './redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
