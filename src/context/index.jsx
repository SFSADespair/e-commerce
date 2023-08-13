'use client'

import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {
    const [showNavModal, setShowNavModal] = useState(false)
    const [pageLevelLoader, setpageLevelLoader] = useState(true)
    const [componentLevelLoader, setComponentLevelLoader] = useState({loading: false, id: ''})
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [currentUProduct, setCurrentUProduct] = useState(null)
    const [showCartModel, setShowCartModel] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [addressList, setAddressList] = useState([])
    const [addressFormData, setAddressFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    })

    useEffect(() => {
        if(Cookies.get('token') !== undefined) {
            setIsAuth(true)
            const userData = JSON.parse(localStorage.getItem('user'))  || {}
            setUser(userData)
        } else {
            setIsAuth(false)
        }
    }, [Cookies])

    return (
        <>
            <GlobalContext.Provider value={{
                showNavModal, setShowNavModal, 
                pageLevelLoader, setpageLevelLoader, 
                isAuth, setIsAuth, 
                user, setUser, 
                componentLevelLoader, setComponentLevelLoader,
                currentUProduct, setCurrentUProduct,
                showCartModel, setShowCartModel,
                cartItems, setCartItems,
                addressList, setAddressList,
                addressFormData, setAddressFormData
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}