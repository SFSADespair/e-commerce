import connectDB from "@/DB"
import Order from "@/Models/order"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const GET = async(req) => {
    try {
        await connectDB()

        const isAuth = ((await AuthUser(req)).valueOf())
        if (isAuth) {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')
            if(!id)
                return NextResponse.json({
                    success: false,
                    message: 'Please login!'
                })
            
            const orderDetails = await Order.findById(id).populate('orderItems.product')
            if(orderDetails)
                return NextResponse.json({
                    success: true,
                    data: orderDetails
                })
            else
                return NextResponse.json({
                    success: false,
                    messsage: 'Could not find any orders.'
                })
        } else
            return NextResponse.json({
                success: false,
                message: 'You are not authenticated.'
            })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}