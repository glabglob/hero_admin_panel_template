import { configureStore } from '@reduxjs/toolkit';

// import heroesReducer from '../reducers/heroes';
// import filtersReducer from '../reducers/filters';

import filtersReducer from '../components/heroesFilters/filterSlice';
import heroesReducer from '../components/heroesList/heroesSlice';

const stringMiddleWare = () => (next) => (actions) => {
    if (typeof actions === 'string') {
        return next({
            type: actions
        })
    }
    return next(actions);
};

const store = configureStore({
    reducer: { heroesReducer, filtersReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production'
})


//Без  использования ReduxToolkit

// const store = createStore(
//     combineReducers({ heroesReducer, filtersReducer }),
//     compose(applyMiddleware(ReduxThunk, stringMiddleWare),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


export default store;

