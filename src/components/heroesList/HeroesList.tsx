
import { FC, useMemo } from "react";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import {useAppSelector } from "../../store/store";
//import { fetchHeroes } from "../../store/thunks/fetch-heroes";
import { heroesSelector } from "../../store/slices/hero-slice";
import { useGetHeroesQuery } from "../../api/api-slice";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList: FC = () => {
  const {
    data: heroes,
    isFetching,
    isError,

  } = useGetHeroesQuery('heroes')


  const {filter} = useAppSelector(heroesSelector);
  //const dispatch = useAppDispatch();


    const renderHeroes = useMemo(() => {
        return heroes ? heroes.filter((item) => {

            if(filter === 'all') return item.element

            return item.element === filter
            
        }): [];
    }, [filter, heroes])
    
        
    


    // useEffect(() => {
   
    //     //dispatch(fetchHeroes())


    // }, [heroes]);

    if (isFetching) {
        return <Spinner />;
    } 
    else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }
    

    return (
            <ul>
                {
                    !renderHeroes.length ? 
                    <h5 className="text-center mt-5">Героев пока нет</h5>: renderHeroes.map(({id, ...props}) => (
                        <HeroesListItem id={id} key={id} {...props} />
                    ))
                }
            </ul>
    )
};

export default HeroesList;
