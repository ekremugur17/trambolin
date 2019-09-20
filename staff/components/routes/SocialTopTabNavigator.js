import { createMaterialTopTabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Prizes from '../../screens/social/Prizes';
import Targets from '../../screens/social/Targets';

const width = Dimensions.get('window').width;

const TopTabConfig = {
  initialRouteName: 'Mesajlar',
  backBehavior: 'initialRoute',
  swipeEnabled: false,
  tabBarOptions: {
    scrollEnabled: true,
    upperCaseLabel: false,
    activeTintColor: '#42c0ef',
    inactiveTintColor: '#111',
    labelStyle: {
      fontSize: 16,
      position: 'absolute',
      top: 0,
      fontFamily: 'Poppins',
    },
    tabStyle: {
      width: width / 2,
      height: 40
    },
    style: {
      // backgroundColor: '#42c0ef',
      backgroundColor: '#fff',
    },
    indicatorStyle: {
      backgroundColor: '#42c0ef'
    }
  }
};

const AppTopTabNavigator = createMaterialTopTabNavigator({
  Mesajlar: { screen: Prizes },
  Hedefler: { screen: Targets }
}, TopTabConfig);




export default AppTopTabNavigator;