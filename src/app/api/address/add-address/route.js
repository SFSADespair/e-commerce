import connectDB from "@/DB"
import Address from "@/Models/address"
import AuthUser from "@/middleware/AuthUser"
import Joi from "joi"
import { NextResponse } from "next/server"

export const dynamic= 'force-dynamic'

const AddNewAddress = Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postalCode: Joi.string().required(),
    userID: Joi.string().required()
})

export const POST = async(req) => {
    try {
        await connectDB()

        const isAuth = (await AuthUser(req)).valueOf()
        if (isAuth) {
            const data = await req.json()
            const { fullName, address, city, country, postalCode, userID } = data
            
            const { error } = AddNewAddress.validate({
                fullName,
                address,
                city,
                country,
                postalCode,
                userID
            })

            if (error)
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                    status: 204
                })
            
                const newAddress = await Address.create(data)
                if (newAddress)
                    return NextResponse.json({
                        success: true,
                        message: 'Added new address!'
                    })
                else
                    return NextResponse.json({
                        success: false,
                        message: 'Failed to add address'
                    })
        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authorized!'
            })
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}