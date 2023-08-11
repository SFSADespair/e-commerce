import connectDB from "@/DB";
import Cart from "@/Models/cart";
import AuthUser from "@/middleware/AuthUser";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const AddToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required()
})

export const POST = async(req) => {
    try {
        await connectDB()
        const isAuth = (await AuthUser(req)).valueOf()

        if (isAuth?.role) {
            const data = await req.json()
            const { productID, userID } = data

            const {error} = AddToCart.validate({ userID, productID })
            if (error)
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                })


            const isCartItemExist = await Cart.exists({ userID: userID, productID: productID })
            console.log(isCartItemExist);
            if (isCartItemExist)
                return NextResponse.json({
                    success: false,
                    message: 'Cart item already exists!'
                })

            const saveProductToCart = await Cart.create(data)
                
            if (saveProductToCart)
                return NextResponse.json({
                    success: true,
                    message: 'Added to card'
                })
            else
                return NextResponse.json({
                    success: false,
                    message: 'Failed to add product to cart.'
                })
            
        } else
            return NextResponse.json({
                success: false,
                message: 'You are not authorised'
            })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}