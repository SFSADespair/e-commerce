import connectDB from "@/DB"
import Order from "@/Models/order"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const GET = async(req) => {
    try {
        //Connect to the DB
        await connectDB()
        const isAuth = (await AuthUser(req)).valueOf()
        if (isAuth && isAuth?.role === 'admin') { //Checks to see if user is authenticated and is registered as an admin
            //Get all orders from all the users in the Database
            const orders = await Order.find({})
                .populate('orderItems.product')
                .populate('user') 
            
            if (orders) {
                return NextResponse.json({
                    success: true,
                    data: orders
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to fetch orders!'
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authorized to access this API route.'
            })
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later!'
        })
    }
}