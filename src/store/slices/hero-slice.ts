import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { AppRootState } from "../store"

export type Filters = 'all' | 'fire' | 'water' | 'wind' | 'earth'
export type Statuses = 'idle' | 'pending' | 'error' | 'resolved' | 'removing' | 'removed' | 'created'



export type initialStateType = {

    filter: Filters
}

const initialState = {
    filter: 'all'
} as initialStateType


const heroDataSlice = createSlice({
    name: 'heroData',
    initialState,
    reducers: {
     
        filterHeroes(state, action: PayloadAction<{filter: Filters}>){
            state.filter = action.payload.filter
        }

    }
})

export const {
  
    filterHeroes, 
} = heroDataSlice.actions
export const heroDataSliceReducer = heroDataSlice.reducer



const selector = (state: AppRootState) => state
export const heroesSelector = createSelector(selector, (state) => state.heroesData)