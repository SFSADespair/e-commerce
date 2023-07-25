'use client'

import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {
    const [showNavModal, setShowNavModal] = useState(false)
    const [commonLoader, setCommonLoader] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)

    return (
        <>
            <GlobalContext.Provider value={{showNavModal, setShowNavModal, commonLoader, setCommonLoader, isAuth, setIsAuth, user, setUser}}>{children}</GlobalContext.Provider>
        </>
    )
}