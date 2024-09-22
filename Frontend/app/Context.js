import { createContext } from 'react';

export const SplashContext = createContext({
    showSplash: false,
    setShowSplash: (val)=>{}
});