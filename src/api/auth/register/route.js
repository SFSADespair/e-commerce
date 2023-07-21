import connectDB from "@/DB"
import User from "@/Models/user"
import { hash } from "bcryptjs"
import Joi from "joi"
import { NextResponse } from "next/server"

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
})

export const dynamic = 'force-dynamic'

export const POST = async(req) => {
    //connect to the DB
    await connectDB()

    const { name, email, password, role } = await req.json()

    //validate values using the joi schema
    const { error } = schema.validate({ name, email, password, role })

    if(error) {
        return NextResponse.json({
            success: false,
            message: email.details[0]
        })
    }

    try {
        const userExist = await User.findOne({email})
        if (userExist)
            return NextResponse.json({
                success: false,
                message: 'User already exists.'
            })
        else {
            const hashPass = await hash(password, 12)

            const newUser = await User.create({
                name,
                email,
                password: hashPass,
                role
            })

            if (newUser)
                NextResponse.json({
                    success: true,
                    message: 'Account Created'
                })
        }
    } catch(e) {
        console.log(e);

        return NextResponse.json({
            success: false,
            message: e.message
        })
    }
}