'use client'

import CommonCart from "@/components/CommonCart"
import { GlobalContext } from "@/context"
import { deleteCartItem, getCartItems } from "@/services/cart"
import { useContext, useEffect } from "react"
import { PulseLoader } from "react-spinners"
import { toast } from "react-toastify"

export default function Cart() {
    const { 
        user, 
        cartItems, setCartItems, 
        pageLevelLoader, setpageLevelLoader,
        componentLevelLoader, setComponentLevelLoader 
    } = useContext(GlobalContext)

    const getCart = async() => {
        setpageLevelLoader(true)
        const res = await getCartItems(user?._id)
        if(res.success) {
            setCartItems(res.data)
            setpageLevelLoader(false)
            localStorage.setItem('cartItems', JSON.stringify(res.data))
        }
    }

    useEffect(()  => {
        if (user !== null)
            getCart()
    }, [user])

    const handleRemove = async (id) => {
        setComponentLevelLoader({ loading: true, id: id})

        const res = await deleteCartItem(id)
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            getCart()
        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    if (pageLevelLoader) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <PulseLoader 
                    color={'#000000'}
                    loading={pageLevelLoader}
                    size={30}
                    data-testid="loader"
                />
            </div>
        )
    }

    return (
        <div>
            <CommonCart componentLevelLoader={componentLevelLoader} cartItems={cartItems} handleRemove={handleRemove} />
        </div>
    )
}