import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk'
import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';

const stringMiddleWare = () => (next) => (actions) => {
    if (typeof actions === 'string') {
        return next({
            type: actions
        })
    }
    return next(actions);
};

const store = createStore(
    combineReducers({ heroesReducer, filtersReducer }),
    compose(applyMiddleware(ReduxThunk, stringMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


export default store;

