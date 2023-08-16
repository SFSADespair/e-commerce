import connectDB from "@/DB"
import Order from "@/Models/order"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const GET = async(req) => {
    try {
        await connectDB()
        const isAuth = (await AuthUser(req)).valueOf()
        if (isAuth) {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')
            if (!id)
                return NextResponse.json({
                    success: false,
                    message: 'Please login!'
                })

            const orders = await Order.find({user: id}).populate('orderItems.product')
            if (orders)
                return NextResponse.json({
                    success: true,
                    data: orders
                })
            else
                return NextResponse.json({
                    success: false,
                    message: 'Failed to get all orders. Please try again later.'
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