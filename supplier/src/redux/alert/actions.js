import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../actions';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  const stamp = setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id, stamp }
  });
}

export const clearAlerts = () => dispatch => {
  dispatch({ type: CLEAR_ALERTS });
}