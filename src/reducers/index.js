const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredeHeroes: []
}

const reducer = (state = initialState, action) => {
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
                heroesLoadingStatus: 'idle',
                // вот это поменять как допишу все 
                filteredeHeroes: state.activeFilter === 'all' ? action.payload : action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED': //(1) задание из  HeroesList
            let newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                // вот это поменять как допишу все
                filteredeHeroes: state.activeFilter === 'all' ? newHeroList : newHeroList.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_CREATED': // (3) задание из HeroesAddForm
            let newHeroListWithCreatedHeroes = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroListWithCreatedHeroes,
                // вот это поменять как допишу все
                filteredeHeroes: state.activeFilter === 'all' ? newHeroListWithCreatedHeroes : newHeroListWithCreatedHeroes.filter(item => item.element === state.activeFilter)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredeHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;