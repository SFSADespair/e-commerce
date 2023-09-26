import Cookies from "js-cookie"

const URL = 'https://oompie-store.vercel.app' || 'http://localhost:3000'

export const addToCart = async(formData) => {
    try {
        const res = await fetch('/api/client/cart/add-to-cart', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getCartItems = async(id) => {
    try {
        const res = await fetch(`${URL}/api/client/cart/cart-items?id=${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        })

        const data = await res.json()
        return data
    } catch (e) {
        console.log(e);
    }
}

export const deleteCartItem = async(id) => {
    try {
        const res = await fetch(`/api/client/cart/delete-from-cart?id=${id}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        })

        const data = res.json()
        return data
    } catch (e) {
        console.log(e);
    }
}