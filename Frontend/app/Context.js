import { createContext } from 'react';

export const PageLoadContext = createContext({
    loaded: false,
    setLoaded: (prev)=>{}
})