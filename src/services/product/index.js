import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
    try {
        const res = await fetch('/api/admin/add-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        console.log('Hello There');
    }
}

