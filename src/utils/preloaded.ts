import { Store } from "@reduxjs/toolkit"

export const PreloadedStore = () => {

    const persist = (key: string, store: Store) => {
       
        localStorage.setItem(key, JSON.stringify(store.getState()))


    }

    const preloadStore = <T = any>(key: string): () => T | undefined => {
        return (): T | undefined  => {
          const persistedString = localStorage.getItem(key);
          if (persistedString) {
            return JSON.parse(persistedString) as T
            
          }

         
        };
      };

    return {
        persist,
        preloadStore
    }
}