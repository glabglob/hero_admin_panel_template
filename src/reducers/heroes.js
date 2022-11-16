const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED': //(1) задание из  HeroesList
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
            }
        case 'HERO_CREATED': // (3) задание из HeroesAddForm
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        default: return state
    }
}

export default heroesReducer;