import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import Landing from '../../screens/landing';
import Login from '../../screens/login';
import Forgot from '../../screens/forgot';
import appStackNav from './AppStackNavigator';
import CompleteProfile from '../../screens/profile/CompleteProfile';

const AppNavigator = createSwitchNavigator({
  Landing: { screen: Landing },
  Login: { screen: Login },
  Dashboard: { screen: appStackNav },
  CompleteProfile: { screen: CompleteProfile },
  Forgot: { screen: Forgot }
});

export default createAppContainer(AppNavigator);