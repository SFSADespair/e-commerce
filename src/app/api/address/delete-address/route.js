import connectDB from "@/DB"
import Address from "@/Models/address"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const DELETE = async(req) => {
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
        if(isAuth) {  
            const address = await Address.findByIdAndDelete(id)
            if (address)
                return NextResponse.json({
                    success: true,
                    message: 'Deleted Address.'
                })
            else
                return NextResponse.json({
                    success: false,
                    message: 'Could not delete address.'
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