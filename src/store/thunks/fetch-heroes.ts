import { heroesAPI } from "../../hooks/heroesAPI"
import { heroesFetched, heroesFetching, heroesFetchingError } from "../slices/hero-slice"
import { AppThunk } from "../store";


export const fetchHeroes = (): AppThunk => {
    return async (dispatch) => {
        dispatch(heroesFetching())

        try {
            const heroes = await heroesAPI.fetchHeroes()
            dispatch(heroesFetched(heroes))
        }
        catch(e){
            dispatch(heroesFetchingError())
        }
    }
}