import Cookies from "js-cookie"
import { Cookie } from "next/font/google"

const URL = 'https://oompie-store.vercel.app'

export const addAddress = async(formData) => {
    try {
        const res = await fetch('/api/address/add-address', {
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

export const getAddressList = async(id) => {
    try {
        const res = await fetch(`${URL}/api/address/get-all-address?id=${id}`, {
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

export const updateAddress = async(formData) => {
    try {
        const res = await fetch('/api/address/update-address', {
            method: 'PUT',
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

export const deleteAddress = async(id) => {
    try {
        const res = await fetch(`/api/address/delete-address?id=${id}`, {
            method: 'DELETE',
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