export const registerNewUser = async (formData) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = response.json()

        return data
    } catch(e) {
        console.log('error', e);
    }
}