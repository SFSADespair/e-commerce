'use client'

import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(null);
export const initCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: '',
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: 0
}

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
    const [checkoutFormData, setCheckoutFormData] = useState(initCheckoutFormData)

    useEffect(() => {
        if(Cookies.get('token') !== undefined) {
            setIsAuth(true)
            const userData = JSON.parse(localStorage.getItem('user'))  || {}
            setUser(userData)

            const crtItm = JSON.parse(localStorage.getItem('cartItems')) || {}
            setCartItems(crtItm)
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
                addressFormData, setAddressFormData,
                checkoutFormData, setCheckoutFormData
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}