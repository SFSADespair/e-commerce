import connectDB from "@/DB"
import User from "@/Models/user"
import { compare } from "bcryptjs"
import Joi from "joi"
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server"

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const dynamic = 'force-dynamic'

export async function POST(req) {
    await connectDB()

    const { email, password } = await req.json()

    const { error } = schema.validate({ email, password })
    if(error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message
        })
    }

    try {
        const findUser = await User.findOne({email})
        if (!findUser) 
            return NextResponse.json({
                success: false,
                message: "Incorrect credentials"
            })

        const checkPass = await compare(password, findUser.password)
        if (!checkPass)
            return NextResponse.json({
                success: false,
                message: "Incorrect credentials"
            })

        const token = jwt.sign({
            id: findUser?._id,
            email: findUser?.email,
            role: findUser?.role
        }, 'default_secret_key', {expiresIn: '30d'})

        const res = {
            token,
            user: {
                email: findUser?.email,
                name: findUser?.name,
                _id: findUser?._id,
                role: findUser?.role
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: res
        })
    } catch(e) {
        console.log(e);

        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later."
        })
    }
}