// app/context/ThemeContext.jsx
'use client'

import { createContext, ReactNode, useContext } from 'react'


const GlobalCtx = createContext({ pageLoaded: () => { } });

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <GlobalCtx.Provider value={useContext(GlobalCtx)}>
            {children}
        </GlobalCtx.Provider>
    );
}

export function useGlobalCtx() {
    const context = useContext(GlobalCtx);
    const err = new Error('Page loading components failed to load');
    err.name = 'LoadingError';
    if (!context) throw err;
    return context
}