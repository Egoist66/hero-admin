import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { HeroesResponse } from "../../hooks/heroesAPI"
import { AppRootState } from "../store"

export type Filters = 'all' | 'fire' | 'water' | 'wind' | 'earth'
export type Statuses = 'idle' | 'pending' | 'error' | 'resolved' | 'removing' | 'removed' | 'created'



export type initialStateType = {
    heroes: HeroesResponse[],
    heroesStatus: 'pending' | 'error' | 'resolved',
    filter: Filters
}

const initialState = {
    heroes: [],
    heroesStatus: 'pending',
    filter: 'all'
} as initialStateType


const heroDataSlice = createSlice({
    name: 'heroData',
    initialState,
    reducers: {
        // heroes fetching 

        heroesFetching(state){
            state.heroesStatus = 'pending'
        },

        heroesFetched(state, action: PayloadAction<HeroesResponse[]>){
            state.heroes.push(...action.payload)
            state.heroesStatus = 'resolved'
        },

        heroesFetchingError(state){
            state.heroesStatus = 'error'
        },


        // heroes removing

        removingHero(state, action: PayloadAction<{id: string, charStatus: Statuses}>){
            state.heroes = state.heroes.map(h => h.id === action.payload.id ? {...h, charStatus: action.payload.charStatus} : h)
        },

        removedHero(state, action: PayloadAction<{id: string}>){
            state.heroes = state.heroes
            .filter(h => h.id !== action.payload.id)
            .map(h => h.id === action.payload.id ? {...h, status: 'removed' } : h)

        },

        removedHeroError(state){
            state.heroesStatus = 'error'
        },

        //create heroes

        creatingHero(state){
            state.heroesStatus = 'pending'
        },

        createdHero(state, action: PayloadAction<HeroesResponse>){
            state.heroesStatus = 'resolved'
            state.heroes.push({
                description: action.payload.description,
                name: action.payload.name,
                charStatus: action.payload.charStatus,
                element: action.payload.element,
                id: action.payload.id
            })
           
        },

        createdHeroError(state){
            state.heroesStatus = 'error'
        },

        // filter heroes


        filterHeroes(state, action: PayloadAction<{filter: Filters}>){
            state.filter = action.payload.filter
        }


    }
})

export const {
    heroesFetched, 
    removedHero, 
    removingHero, 
    heroesFetching,
    removedHeroError,
    createdHero,
    creatingHero,
    createdHeroError,
    filterHeroes, 
    heroesFetchingError
} = heroDataSlice.actions
export const heroDataSliceReducer = heroDataSlice.reducer

const selector = (state: AppRootState) => state
export const heroesSelector = createSelector(selector, (state) => state.heroesData)