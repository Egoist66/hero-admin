import { heroesAPI } from "../../hooks/heroesAPI"
import { delay } from "../../utils/delay"
import { Statuses, createdHero, createdHeroError, creatingHero } from "../slices/hero-slice"
import { AppThunk } from "../store"

export type createdHeroPayload = {
    name: string,
    description: string,
    charStatus: Statuses
    element: 'fire' | 'water' | 'wind' | 'earth' | ""

}

export const createHeroes = ({description, element, name, charStatus}: createdHeroPayload): AppThunk => {
    return async (dispatch) => {
        dispatch(creatingHero())
        try {
            const data = await heroesAPI.createHeroes({description, element, name, charStatus})
            await delay(500)
            dispatch(createdHero(data))
         
        }
        catch(e){
            dispatch(createdHeroError())
        }
    }
}