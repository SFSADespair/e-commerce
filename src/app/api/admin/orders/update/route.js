import connectDB from "@/DB"
import Order from "@/Models/order"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const PUT = async(req) => {
    try {
        //Connect to the DB
        await connectDB()
        const isAuth = (await AuthUser(req)).valueOf()
        if (isAuth && isAuth?.role === 'admin') { //Checks to see if user is authenticated and is registered as an admin
            const data = await req.json() //Retrieve the order array from the reqeust
            if (data) { //Check if data is not null
                const {
                    _id,
                    shippingAddress, orderItems,
                    paymentMethod, isPaid,
                    paidAt, isProcessing
                } = data //Seperate the order array in their own respective variables
                const updateOrder = await Order.findOneAndUpdate({ _id: _id }, {
                    shippingAddress, orderItems,
                    paymentMethod, isPaid,
                    paidAt, isProcessing
                }, { new: true }) //Update the order

                if (updateOrder)  //Check if the updateOrder returns true
                    return NextResponse.json({
                        success: true,
                        message: 'Order status updated successfully'
                    })
                else
                    return NextResponse.json({
                        success: false,
                        message: 'Failed to update order status.'
                    })
            } else
                return NextResponse.json({
                    success: false,
                    message: 'There is no order data.'
                })
        } else 
            return NextResponse.json({
                success: false,
                message: 'You are not authorized to access this API route.'
            })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}