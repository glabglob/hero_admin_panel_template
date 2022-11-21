import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(
    // это тип действия
    'heroes/fetchHeroes',
    // это промис но не надо прописывать  async await потому что это прописано в хуке useHttp
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // ключ это экшн  креэйтор, а значение ключа это редусер
        // heroesFetching: state => {
        //     state.heroesLoadingStatus = 'loading';
        // },
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle';
        //     state.heroes = action.payload;
        // },
        // heroesFetchingError: state => {
        //     state.heroesLoadingStatus = 'error';
        // },
        heroCreateByForm: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeletedById: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    },
    // дополнительные редусеры
    // треперь нам не нужен зыпрос в экшенах
    // и не нужны истиненные редусеры, с 1 до 3, 24 строка - 33 строка
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => { })
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