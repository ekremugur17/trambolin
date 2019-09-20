import {
  USER_LOADED,
  STORAGE_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS
} from '../actions';
import { AsyncStorage } from 'react-native';
import SetAuthToken from '../../components/SetAuthToken';

const initialState = {
  loading: true,
  isAuthenicated: false,
  user: null,
  token: null,
  storage: null
}

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenicated: true,
        loading: false
      }
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      SetAuthToken();
      return {
        ...state,
        loading: false,
        isAuthenicated: false,
        user: null,
        token: null,
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenicated: true,
        loading: false,
        user: payload
      }
    case STORAGE_LOADED:
      return {
        ...state,
        storage: {
          ...payload
        }
      }
    default:
      return state
  }
}