import connectDB from "@/DB"
import Cart from "@/Models/cart"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const DELETE = async(req) => {
    try {
        connectDB()

        const isAuth = (await AuthUser(req)).valueOf()
        if (isAuth) {
            const { searchParams } = new URL(req.url)
            const id = searchParams.get('id')
            if(!id)
                return NextResponse.json({
                    success: false,
                    message
                })

            const cartItem = await Cart.findByIdAndDelete(id)
            if(cartItem)
                return NextResponse.json({
                    success: true,
                    message: 'Removed item from cart.'
                })
            else 
                return NextResponse.json({
                    success: false,
                    message: 'Failed to delete cart item.'
                })
        } else
            return NextResponse.json({
                success: false,
                message: 'Cart item ID is required.'
            })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}