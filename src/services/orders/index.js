import Cookies from "js-cookie"

const URL = 'http://localhost:3000'

export const createOrder = async(formData) => {
    try {
        const res = await fetch('/api/order/create', {
            method: 'POST',
            headers: {
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

export const allOrders = async(id) => {
    try {
        const res = await fetch(`/api/order/orders?id=${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })

        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export const ordrDetails = async(id) => {
    try {
        const res = await fetch(`/api/order/details?id=${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })

        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
}