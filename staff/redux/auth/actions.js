import {
  USER_LOADED,
  STORAGE_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR
} from '../actions';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import SetAuthToken from '../../components/SetAuthToken';

export const loadUser = () => async dispatch => {
  const tok = await AsyncStorage.getItem('userToken');
  SetAuthToken(tok);
  // console.log(tok)
  try {
    const res = await axios.get('http://34.219.165.177:5000/api/auth/staff');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log('auth error')
    await AsyncStorage.removeItem('userToken');
    dispatch({
      type: AUTH_ERROR
    });
  }
}


export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('http://34.219.165.177:5000/api/auth/staff', body, config);
    AsyncStorage.setItem('userToken', res.data.token);
    SetAuthToken(res.data.token);
    await dispatch(loadUser());
    await dispatch(loadAssets());
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    await AsyncStorage.removeItem('userToken');
    const errors = error.response.data.errors;
    if (errors) {
      alert(errors[0].msg);
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
}

export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('userToken');
  await dispatch({ type: LOGOUT_SUCCESS })
}

export const loadAssets = () => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const mainSlider = await axios.post('http://34.219.165.177:5000/api/app', { "name": "mainSlider" }, config);
    const coupons = await axios.post('http://34.219.165.177:5000/api/app', { "name": "coupons" }, config);
    const discounts = await axios.post('http://34.219.165.177:5000/api/app', { "name": "discounts" }, config);
    const brands = await axios.get('http://34.219.165.177:5000/api/auth/brand', config);
    await dispatch({
      type: STORAGE_LOADED,
      payload: {
        mainSlider: {
          ...mainSlider.data
        },
        couponSlider: {
          ...coupons.data
        },
        discountSlider: {
          ...discounts.data
        },
        brands: [
          ...brands.data
        ]
      }
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
}