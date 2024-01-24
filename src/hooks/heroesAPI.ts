import axios from 'axios'
import { createdHeroPayload } from '../store/thunks/create-heroes'
import { Statuses } from '../store/slices/hero-slice'

export type HeroesResponse =  {
  id: string
  name: string
  charStatus: Statuses
  description: string
  element: 'fire' | 'water' | 'wind' | 'earth' | ""
}


export const heroesAPI = {

  async fetchHeroes(){
    const {data} = await axios.get<HeroesResponse[]>('http://localhost:3001/heroes')
    
    return data
  },

  async deleteHeroes(id: string){
    const {data} = await axios.delete(`http://localhost:3001/heroes/${id}`)

    return data
  },

  async createHeroes({description, element, name, charStatus}: createdHeroPayload){
    const {data} = await axios.post<HeroesResponse>(`http://localhost:3001/heroes/`, {description, element, name, charStatus})
 
    return data
  },
}