import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreateByForm,
    heroDeletedById
} from '../actions'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesReducer = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            //визуально это выглядит  не иммутабельно
            //но библиотека преравитит этот код в 
            //код с использованием принципов иммутабельности
            // как в строке 31 - 34
            //в такой функции  не нужно ничего возвращать
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreateByForm, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeletedById, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        })
        .addDefaultCase(()=>{});
})

// без  использования Redux Toolkit

// const heroesReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETED': //(1) задание из  HeroesList
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             }
//         case 'HERO_CREATED': // (3) задание из HeroesAddForm
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         default: return state
//     }
// }

export default heroesReducer;