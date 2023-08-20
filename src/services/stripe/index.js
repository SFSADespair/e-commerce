import Cookies from "js-cookie"


export const callStripeSession = async(formData) => {
    try {
        const res = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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