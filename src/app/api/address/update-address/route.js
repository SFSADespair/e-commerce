import connectDB from "@/DB"
import Address from "@/Models/address"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const PUT = async(req) => {
    try {
        await connectDB()

        const isAuth = ((await AuthUser(req)).valueOf())
        if (isAuth) {
            const data = await req.json()
            const {
                _id,
                fullName, address, city,
                country, postalCode
            } = data

            const updateAddress = await Address.findOneAndUpdate({ _id: _id }, {
                fullName, address, city,
                country, postalCode
            }, { new: true })
            if (updateAddress)
                return NextResponse.json({
                    success: true,
                    message: 'Updated Address'
                })
            else 
                return NextResponse.json({
                    success: false,
                    message: 'Failed to updated Address.'
                })
        } else
            return NextResponse.json({
                success: false,
                message: 'You are not authenticated!'
            })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}