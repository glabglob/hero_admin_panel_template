import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // ключ это экшн  креэйтор, а значение ключа это редусер
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error';
        },
        heroCreateByForm: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeletedById: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    }
});

const { actions, reducer } = heroesSlice;
export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreateByForm,
    heroDeletedById
} = actions;