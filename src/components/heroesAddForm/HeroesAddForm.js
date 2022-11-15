import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heroCreateByForm } from '../../actions/index';
import { v4 as uuidv4 } from 'uuid';
// Задача для этого компонента: (3)
// Реализовать создание нового героя с введенными данными. Он должен попадать 
// в общее состояние и отображаться в списке *done* + фильтроваться 
// Уникальный идентификатор персонажа можно сгенерировать через uiid 
// Усложненная задача: (4)
// Персонаж создается и в файле json при помощи метода POST *done*
// Дополнительно: (5)
// Элементы <option></option> желательно сформировать на базе 
// данных из фильтров 

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state);

    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement
        }

        //(4)
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
            .then((result) => {
                dispatch(heroCreateByForm(newHero));
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });

        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                // eslint-disable-next-line
                if (name === 'all') return;
                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;