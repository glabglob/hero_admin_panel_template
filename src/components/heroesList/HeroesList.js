import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { fetchHeroes, heroDeletedById } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// (1) При клике на "крестик" идет удаление персонажа из общего состояния *done*
// Усложненная задача:
// (2) Удаление идет и с json файла при помощи метода DELETE *done*

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filtersReducer.activeFilter,
        (state) => state.heroesReducer.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter);
            }
        }
    );

    const filteredeHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
       
        // eslint-disable-next-line
    }, []);

    //(1) сделано в index.js reducers
    //(2)
    const onDeleteHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE") // (2) используем метод DELETE для удаления из heroes.json
            .then((data) => {
                dispatch(heroDeletedById(id))
                console.log(`deleted ${data}`);
            }).catch((err) => {
                console.log(err);
            });
        // eslint-disable-next-line
    }, [request])


    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} onDeleteHero={() => onDeleteHero(id)} />
        })
    }

    const elements = renderHeroesList(filteredeHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;