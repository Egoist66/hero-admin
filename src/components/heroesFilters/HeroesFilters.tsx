
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { FC } from "react";
import { Filters, filterHeroes, heroesSelector } from "../../store/slices/hero-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const HeroesFilters: FC = () => {

    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(heroesSelector)

    const filterChar = (filter: Filters) => {
        return () => {
            dispatch(filterHeroes({filter}))
        }
    }
    
    let activeClass = ''

    switch(filter){
        case "all": {
            activeClass = "btn btn-outline-dark active"
            break
        }
        case "fire": {
            activeClass = "btn btn-danger active"
            break
        }
        case "water": {
            activeClass = "btn btn-primary active"
            break
        }
        case "wind": {
            activeClass = "btn btn-success active"
            break
        }
        case "earth": {
            activeClass = "btn btn-secondary active"
            break
        }
    }
 

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={filterChar('all')} className={filter === 'all' ? activeClass : "btn btn-outline-dark"}>Все</button>
                    <button onClick={filterChar('fire')}className={filter === 'fire' ? activeClass : "btn btn-danger"}>Огонь</button>
                    <button onClick={filterChar('water')}className={filter === 'water' ? activeClass : "btn btn-primary"}>Вода</button>
                    <button onClick={filterChar('wind')}className={filter === 'wind' ? activeClass : "btn btn-success"}>Ветер</button>
                    <button onClick={filterChar('earth')}className={filter === 'earth' ? activeClass : "btn btn-secondary"}>Земля</button>
                </div>
            </div>
            
        </div>
    )
}

export default HeroesFilters;