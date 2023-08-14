import AuthUser from "@/middleware/AuthUser"
import { NextResponse } from "next/server"

// const secretKey = process.env.secretK
const stripe = require('stripe')(process.env.secretK)

export const dynamic = 'force-dynamic'
const URL = 'http://localhost:3000/checkout'

export const POST = async(req) => {
    try {
        const isAuth = ((await AuthUser(req)).valueOf())
        if (isAuth) {
            const res = await req.json()
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: res,
                mode: 'payment',
                success_url: `${URL}?status=success`,
                cancel_url: `${URL}?status=cancel`
            })

            return NextResponse.json({
                success: true,
                id: session.id 
            })
        } else
            return NextResponse.json({
                success: false,
                messasge: 'You are not authenicated!'
            })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            status: 500,
            success: false,
            message: 'Something went wrong! Please try again later.'
        })
    }
}