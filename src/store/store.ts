import { ThunkAction, ThunkDispatch, UnknownAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { heroDataSliceReducer } from "./slices/hero-slice";
import { apiSlice } from "../api/api-slice";


export const store = configureStore({
    reducer: {
        heroesData: heroDataSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    middleware: (gdm) => gdm().concat(apiSlice.middleware)

})




export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootState,
    unknown,
    UnknownAction
>



export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;