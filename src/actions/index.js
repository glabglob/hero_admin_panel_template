import { createAction } from "@reduxjs/toolkit";


//HEROES -------------------------------------------------------
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then((data) => {
            dispatch(heroesFetched(data));
            console.log(data);
        })
        .catch(() => dispatch(heroesFetchingError()))
};

export const heroesFetching = createAction('HEROES_FETCHING');

//без использования Redux Toolkit
// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }


// payload добавляется автоматически
export const heroesFetched = createAction('HEROES_FETCHED');

//без использования Redux Toolkit
// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

//без использования Redux Toolkit
// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const heroDeletedById = createAction('HERO_DELETED');

//без использования Redux Toolkit
// export const heroDeletedById = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }

export const heroCreateByForm = createAction('HERO_CREATED');

//без использования Redux Toolkit
// export const heroCreateByForm = (hero) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: hero
//     }
// }

//FILTERS -------------------------------------------------------
export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then((result) => {
            dispatch(filtersFetched(result))
        }).catch(() => {
            dispatch(filtersFetchingError())
        });
};

export const filtersFetching = createAction('FILTERS_FETCHING');

//без использования Redux Toolkit
// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

export const filtersFetched = createAction('FILTERS_FETCHED');

//без использования Redux Toolkit
// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');

//без использования Redux Toolkit
// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

export const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED');

//без использования Redux Toolkit
// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }

