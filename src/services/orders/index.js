import Cookies from "js-cookie"

const URL = 'http://localhost:3000'

//Allow the user to create an order
export const createOrder = async(formData) => {
    try {
        const res = await fetch('/api/order/create', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

//Get all the orders from the users
export const allOrders = async(id) => {
    try {
        const res = await fetch(`/api/order/orders?id=${id}`, {
            method: 'GET',
            cache: 'no-store',
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
        console.log(e)
    }
}

//Get order details
export const ordrDetails = async(id) => {
    try {
        const res = await fetch(`/api/order/details?id=${id}`, {
            method: 'GET',
            cache: 'no-store',
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
        console.log(e)
    }
}

//Get all orders from all users
export const adminUserOrders = async() => {
    try {
        const res = await fetch(`/api/admin/orders`, {
            method: 'GET',
            cache: 'no-store',
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
        console.log(e)
    }
}

//Update the order status
export const updateOrderStatus = async(formData) => {
    try {
        const res = await fetch(`/api/admin/orders/update`, {
            method: 'PUT',
            cache: 'no-store',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
                
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        return data
    } catch (e) {
        console.log(e)
    }
}