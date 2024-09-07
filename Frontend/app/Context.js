import { createContext } from 'react';

export const PageLoadContext = createContext({
    pageIsReady: false,
    setPageIsReady: (prev)=>{}
})