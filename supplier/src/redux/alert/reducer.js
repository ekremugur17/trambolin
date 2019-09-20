import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from '../actions'

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case CLEAR_ALERTS:
      state.forEach(alert => clearTimeout(alert.stamp));
      return []
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state
  }
}
