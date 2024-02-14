import { FC, memo } from "react"
//import { useAppDispatch } from "../../store/store";
import { Statuses } from "../../store/slices/hero-slice";
import { useDeleteHeroMutation } from "../../api/api-slice";

type HeroesListItemProps = {
    name: string
    id: string
    charStatus: Statuses
    description: string
    element?: 'fire' | 'water' | 'wind' | 'earth' | ""
}

const HeroesListItem: FC<HeroesListItemProps> = memo(({name, id, description, element}) => {
    //const dispatch = useAppDispatch()

    const [deleteHero, {isLoading}] = useDeleteHeroMutation()

    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }



    return (
        <li className={isLoading ? `removing-char card flex-row mb-4 shadow-lg text-white ${elementClassName}`: `card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button onClick={() => deleteHero(id)} type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
})

export default HeroesListItem;