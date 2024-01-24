import { heroesAPI } from "../../hooks/heroesAPI"
import { delay } from "../../utils/delay";
import { removedHero, removedHeroError, removingHero } from "../slices/hero-slice";
import { AppThunk } from "../store"


export const removeHeroes = (id: string): AppThunk => {
    return async (dispatch) => {
        dispatch(removingHero({id, charStatus: 'removing'}))
        try {
            await heroesAPI.deleteHeroes(id)
            await delay(1000);
            
            dispatch(removedHero({id}))
        }
        catch(e){
            dispatch(removedHeroError())
        }
    }
}