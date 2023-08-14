import connectDB from "@/DB"
import Address from "@/Models/address"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const GET = async(req) => {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')
            if (!id)
                return NextResponse.json({
                    success: false,
                    message: 'Please login!'
                })
            

        const isAuth = ((await AuthUser(req)).valueOf())
        if (isAuth) {
            const addressList = await Address.find({ userID: id })
            if (addressList) 
                return NextResponse.json({
                    success: true,
                    data: addressList
                })
            else 
                return NextResponse.json({
                    success: false,
                    message: 'Could not find any data.',
                    status: 204
                })
        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authenticated.'
            })
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: e.message
        })
    }
}