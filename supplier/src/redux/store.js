import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const initialState = {};

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
);

export default store;