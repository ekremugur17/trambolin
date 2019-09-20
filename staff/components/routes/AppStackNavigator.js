import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import AppBottomTabNavigator from './AppBottomTabNavigator';
import Search from '../../screens/search';
import BrandPage from '../main/BrandPage';
import Icon from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Dimensions, View, Image, Text } from 'react-native';
import CompleteProfile from '../../screens/profile/CompleteProfile';
import EditProfile from '../../screens/profile/EditProfile';
import Purchase from '../../screens/purchase';
import Discount from '../../screens/purchase/discount';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Profile from '../../screens/profile';

const StackNavOptions = {
  defaultNavigationOptions: ({ navigation, screenProps }) => {
    const lastURL = screenProps.avatar ? screenProps.avatar[0] == 'h' ? screenProps.avatar : 'http://' + screenProps.avatar.slice(2, screenProps.avatar.length) : null;
    return {
      headerRight: <Icon style={{ paddingRight: 15 }} color='#222222' onPress={() => navigation.navigate('Search')} name='md-search' size={30} />,
      headerTitle: <Image source={require('../../assets/images/corporate/logo32.png')} style={{ height: 32, width: 32 }} />,
      headerLeft: <TouchableWithoutFeedback onPress={() => navigation.navigate('Profil')}><Image style={{ marginLeft: 15, width: 32, height: 32, borderRadius: 16 }} source={{ uri: lastURL }} /></TouchableWithoutFeedback>
    }
  }
}


const AppStackNav = createStackNavigator({
  Dashboard: { screen: AppBottomTabNavigator },
  Search: { screen: Search },
  Brand: { screen: BrandPage },
  Discount: { screen: Discount },
  Purchase: { screen: Purchase },
  // CompleteProfile: { screen: CompleteProfile },
  EditProfile: { screen: EditProfile },
  Profil: { screen: Profile }
}, {
  headerLayoutPreset: 'center',
  initialRouteName: 'Dashboard',
  ...StackNavOptions
});

const mapStateToProps = ({ auth }) => {
  return {
    avatar: auth.user ? auth.user.avatar : 'http://www.gravatar.com/avatar/f9c354eff5cf0235815fe073fc89f84e?s=200&r=pg&d=mm'
  }
}

export default connect(mapStateToProps)(AppStackNav);