import { setAlert } from '../alert/actions';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions';
import axios from 'axios';
import SetAuthToken from '../../helpers/SetAuthToken';

export const loadUser = () => async dispatch => {
  SetAuthToken(localStorage.token);
  try {
    const res = await axios.get('http://34.219.165.177:5000/api/auth/brand/one');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
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
  }
  const body = JSON.stringify({ email, password })
  try {

    const res = await axios.post('http://34.219.165.177:5000/api/auth/brand', body, config);
    localStorage.setItem('token', res.data.token);
    await dispatch(loadUser());
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 8000)));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS })
}