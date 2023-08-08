import connectDB from "@/DB"
import Product from "@/Models/product"
import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const DELETE = async (req) => {
    try {
        await connectDB()

         const isAuth = (await AuthUser(req)).valueOf()
        if(isAuth?.role === 'admin') {
            const {searchParams} = new URL(req.url)
            const id = searchParams.get('id')
            if(!id) 
                return NextResponse.json({
                    success: false,
                    message: 'Product ID is required'
                })
        
            const deletedProduct = await Product.findByIdAndDelete(id)
            if (deletedProduct)
                return NextResponse.json({
                    success: true,
                    message: 'Product deleted successfully!'
                })
            else
                return NextResponse.json({
                    success: false,
                    message: 'Failed to delete product.'
                })
        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authorized.'
            })
        }

    } catch (err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}