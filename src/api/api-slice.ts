import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HeroesResponse } from '../hooks/heroesAPI';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes'],
    endpoints: builder => ({
        getHeroes: builder.query<HeroesResponse[], any>({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),

        createHero: builder.mutation({
            query: (hero: HeroesResponse) => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),

        deleteHero: builder.mutation({
            query: (id: string) => ({
                url: `/heroes/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Heroes']
        })
    })
})


export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;


