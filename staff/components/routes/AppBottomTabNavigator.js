import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React, { Component } from 'react';
import AppTopTabNavigator from './AppTopTabNavigator';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicon from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Profile from '../../screens/profile';
import Discount from '../../screens/discount';
import SocialTopTabNavigator from './SocialTopTabNavigator';
import Box from '../../screens/box';

const BottomTabConfig = {
  initialRouteName: 'Keşfet',
  barStyle: { backgroundColor: '#fff' },
  activeTintColor: '#42c0ef',
  inactiveColor: '#42c0ef',
  labeled: true
};

const AppBottomTabNavigator = createMaterialBottomTabNavigator({
  Akış: {
    screen: SocialTopTabNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<MaterialIcon name='message' color={tintColor} size={24} />)
    }
  },
  // İndirim: {
  //   screen: Discount,
  //   navigationOptions: {
  //     tabBarIcon: ({ tintColor }) => (<MaterialCommunityIcons name='ticket-percent' color={tintColor} size={26} />)
  //   }
  // },
  Keşfet: {
    screen: AppTopTabNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<MaterialIcon name='dashboard' color={tintColor} size={26} />)
    }
  },
  Kutu: {
    screen: Box,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Ionicon name='ios-gift' color={tintColor} size={24} />)
    }
  },
  // Profil: {
  //   screen: Profile,
  //   navigationOptions: {
  //     tabBarIcon: ({ tintColor }) => (<MaterialIcon name='person' color={tintColor} size={26} />)
  //   }
  // }
},
  BottomTabConfig);



export default AppBottomTabNavigator;