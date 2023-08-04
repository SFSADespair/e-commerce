import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const AuthUser = async(req) => {
    const token = req.headers.get('Authorization').split(" ")[1]

    if(!token) return false

    try {
        const AuthUserInfo = jwt.verify(token, 'default_secret_key')
        if (AuthUserInfo) return AuthUserInfo
    } catch (err) {
        console.log(err)
        return false
    }
}

export default AuthUser