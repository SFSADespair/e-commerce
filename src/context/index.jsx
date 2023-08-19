'use client'

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
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
    const [allUserOrders, setAllUserOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState(null)

    //protected routes
    const protectedRoutes = [
        'cart',
        'checkout',
        'account',
        'orders',
        'admin-view',
    ]

    const protectedAdminRoutes = [
        '/admin-view',
        '/admin-view/add-products',
        '/admin-view/all-products'
    ]

    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        if(Cookies.get('token') !== undefined) {
            setIsAuth(true)
            const userData = JSON.parse(localStorage.getItem('user'))  || {}
            setUser(userData)

            const crtItm = JSON.parse(localStorage.getItem('cartItems')) || {}
            setCartItems(crtItm)
        } else {
            setIsAuth(false)
            setUser({}) //Unauthenticated user
        }
    }, [Cookies])

    //redirects to login page if user is not logged in
    useEffect(() => {
        if (pathName !== '/register' && user && Object.keys(user).length === 0 && protectedRoutes.includes(pathName) > -1) {
            router.push('/login')
        }
    }, [user, pathName])

    //redirects user to unauthorized page if said user does not have an admin role 
    useEffect(() => {
        if (user !== null && user && Object.keys(user).length > 0 && user?.role !== 'admin' && protectedAdminRoutes.indexOf(pathName) > -1)
            router.push('/unauthorized')
    }, [user, pathName])

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
                checkoutFormData, setCheckoutFormData,
                allUserOrders, setAllUserOrders,
                orderDetails, setOrderDetails
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}