
import { useEffect } from "react";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchHeroes } from "../../store/thunks/fetch-heroes";
import { heroesSelector } from '../../store/slices/hero-slice';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroes, heroesStatus, filter} = useAppSelector(heroesSelector);
  const dispatch = useAppDispatch();


  const HeroesList = () => {
   
    return heroes.filter((item) => {
        switch(filter){
            case "all":
                return item
            case "fire":
                   return item.element === 'fire'
            case "water":
                return item.element === 'water'
            case "wind":
                return item.element === 'wind'
            case "earth":
                return item.element === 'earth'
        }
    });
}


    useEffect(() => {
   
        dispatch(fetchHeroes())

    }, []);

    if (heroesStatus === "pending") {
        return <Spinner />;
    } 
    else if (heroesStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }


    console.log('render');
    

    return (
            <ul>
                {
                    !HeroesList().length ? 
                    <h5 className="text-center mt-5">Героев пока нет</h5>: HeroesList().map(({id, ...props}) => (
                        <HeroesListItem id={id} key={id} {...props} />
                    ))
                }
            </ul>
    )
};

export default HeroesList;
