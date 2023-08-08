import connectDB from "@/DB"
import Cart from "@/Models/cart"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const GET = async(req) => {
    try {
        connectDB()

        const isAuth = (await AuthUser(req)).valueOf()
        if (isAuth?.role === 'admin') {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')
            if (!id) return NextResponse.json({
                success: false,
                message: 'Please log in!'
            })

            const cartItems = await Cart.find({ userID: id }).populate('UserID').populate('ProductID')
            if(cartItems)
                return NextResponse.json({
                    success: true,
                    data: cartItems
                })
            else
                return NextResponse.json({
                    success: false,
                    message: 'No cart items found',
                    status: 204
                })

        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authenticated.'
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}