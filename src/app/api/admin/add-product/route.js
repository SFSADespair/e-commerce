import connectDB from "@/DB"
import Product from "@/Models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required()
    
})

export const dynamic = 'dorce-dynamic'


export async function POST(req) {
    try {
        await connectDB()

        const user = 'admin'
        if(user === 'admin') {
            const data = await req.json()
            const { 
                name, price, description, imageUrl, category, sizes, onSale, deliveryInfo, priceDrop 
            } = data
            
            const {error} = AddNewProductSchema.validate({
                name, price, description, imageUrl, category, sizes, onSale, deliveryInfo, priceDrop 
            })
            if(error)
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                })
            
            const newProduct = await Product.create(data)
            if (newProduct)
                return NextResponse.json({
                    success: true,
                    message: 'Product Added Successfuly'
                })
            else
                return NextResponse.json({
                    success: false,
                    message: 'Failed to add the product'
                })
        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authorized'
            })
        }
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}