import { createMaterialTopTabNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Main from '../../screens/main';
import Giyim from '../../screens/main/categories/Giyim';
import Eglence from '../../screens/main/categories/Eglence';
import Deneyim from '../../screens/main/categories/Deneyim';
import EvYasam from '../../screens/main/categories/EvYasam';
import AlisVeris from '../../screens/main/categories/AlisVeris';
import Kozmetik from '../../screens/main/categories/Kozmetik';
import Taki from '../../screens/main/categories/Taki';
import Kisisel from '../../screens/main/categories/Kisisel';
import Bagis from '../../screens/main/categories/Bagis';

const TopTabConfig = {
  initialRouteName: 'Anasayfa',
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
      width: 110,
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
  Anasayfa: Main,
  Giyim: Giyim,
  Takı: Taki,
  Kozmetik: Kozmetik,
  Eğlence: Eglence,
  Ev: EvYasam,
  Deneyim: Deneyim,
  Alışveriş: AlisVeris,
  Kişisel: Kisisel,
  Bağış: Bagis
}, TopTabConfig);




export default AppTopTabNavigator;