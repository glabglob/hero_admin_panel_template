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


export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeletedById = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}

export const heroCreateByForm = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
}

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


export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     }, 1000);
// }
