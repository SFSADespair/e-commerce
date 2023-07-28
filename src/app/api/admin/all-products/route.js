import connectDB from "@/DB"
import Product from "@/Models/product"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const GET = async() => {
    try {
        await connectDB()

        const user = 'admin'
        if (user === 'admin') {
            const getProducts = await Product.find({})
            if (getProducts)
                return NextResponse.json({
                    success: true,
                    data: getProducts
                })
            else
                return NextResponse.json({
                    success: false,
                    status: 204,
                    message: 'No items were found.'
                })
        } else 
            return NextResponse.json({
                success: false,
                message: 'Unauthorized!'
            })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}