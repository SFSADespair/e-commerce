import connectDB from "@/DB"
import Cart from "@/Models/cart"
import Order from "@/Models/order"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const POST = async(req) => {
    try {
        await connectDB()

        const isAuth = ((await AuthUser(req)).valueOf())
        if (isAuth) {
            const data = await req.json()
            const {user} = data
            const saveOrder = await Order.create(data)
            if (saveOrder) {
                await Cart.deleteMany({ userID: user })

                return NextResponse.json({
                    success: true,
                    message: 'Products are on the way :)'
                })
            } else
                return NextResponse.json({
                    success: false,
                    message: 'Failed to create order! Please try again later.'
                })
        } else
            return NextResponse.json({
                success: false,
                messasge: 'You are not authenicated!'
            })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}