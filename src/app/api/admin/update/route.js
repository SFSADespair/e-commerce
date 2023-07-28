import connectDB from "@/DB"
import Product from "@/Models/product"
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export const PUT = async (req) => {
    try {
        await connectDB()
        const data = await req.json()
        const {
            _id,
            name, price,
            description, category, sizes,
            deliveryInfo, onSale, priceDrop, imageUrl
        } = data

        const updatedProduct = await Product.findOneAndUpdate({
            _id: _id
        }, {
            name, price,
            description, category, sizes,
            deliveryInfo, onSale, priceDrop, imageUrl
        }, {new: true})

        if(updatedProduct)
            return NextResponse.json({
                success: true,
                message: 'Product updated successfully'
            })
        else
            return NextResponse.json({
                success: false,
                message: 'Failed to update product.'
            })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:  false,
            message: 'Something went wrong!'
        })
    }
}