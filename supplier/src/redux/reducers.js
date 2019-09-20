import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import alert from './alert/reducer';
import auth from './auth/reducer';


const reducers = combineReducers({
  menu,
  settings,
  alert,
  auth
});

export default reducers;