
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect, useState } from "react";
import { Filters, filterHeroes } from "../../store/slices/hero-slice";
import { useAppDispatch } from "../../store/store";

const HeroesFilters = () => {

    const [filter, setFilter] = useState<Filters>('all')
    const dispatch = useAppDispatch()

    const filterChar = (filter: Filters) => {
        return () => {
            setFilter(filter)
        }
    }

    useEffect(() => {
        dispatch(filterHeroes({filter}))
    }, [filter])
   
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={filterChar('all')} className={filter === 'all' ? "btn btn-outline-dark active" : "btn btn-outline-dark"}>Все</button>
                    <button onClick={filterChar('fire')}className={filter === 'fire' ? "btn btn-danger active" : "btn btn-danger"}>Огонь</button>
                    <button onClick={filterChar('water')}className={filter === 'water' ? "btn btn-primary active" : "btn btn-primary"}>Вода</button>
                    <button onClick={filterChar('wind')}className={filter === 'wind' ? "btn btn-success active" : "btn btn-success"}>Ветер</button>
                    <button onClick={filterChar('earth')}className={filter === 'earth' ? "btn btn-secondary active" : "btn btn-secondary"}>Земля</button>
                </div>
            </div>
            
        </div>
    )
}

export default HeroesFilters;