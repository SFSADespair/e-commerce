import connectDB from "@/DB"
import Product from "@/Models/product"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const GET = async (req) => {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        const getData = await Product.find({category: id})

        if(getData)
            return NextResponse.json({
                success: true,
                data: getData
            })
        else
            return NextResponse.json({
                success: false,
                status: 204,
                message: 'No Products Found'
            })
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try agian later.'
        })
    }
}