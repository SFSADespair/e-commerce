'use client'

import PageLevelLoader from "@/components/Loader/pagelevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { getAddressList } from "@/services/address"
import { createOrder } from "@/services/orders"
import { callStripeSession } from "@/services/stripe"
import { loadStripe } from "@stripe/stripe-js"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const styles = {
    button: 'mt-5 mb-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl',
    checkout: 'disabled:opacity-50 mt-5 mb-5 w-full inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl',
}

export default function Checkout() {
    const { 
        user,
        cartItems,
        componentLevelLoader, setComponentLevelLoader,
        pageLevelLoader, setpageLevelLoader,
        addressList, setAddressList,
        checkoutFormData, setCheckoutFormData
    } = useContext(GlobalContext)
    const [selected, setSelected] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const router = useRouter()
    const params = useSearchParams()

    const publishableKey = 'pk_test_51NThfGIyN98lbcOOhowi5SvkMp4G0bOZgnIA4HfrLcufnfrI6b2OpIklCX7NMDs6cVCRYuXnk8pbv6KmnMHs0QoU00wLoygcrh'
    const stripePromise = loadStripe(publishableKey)

    const getAddresses = async() => {
        setpageLevelLoader(true)
        const res = await getAddressList(user?._id)
        if (res.success) {
            setAddressList(res.data)
            setpageLevelLoader(false)
        }
    }

    useEffect(() => {
        if (user !== null)
            getAddresses()
    }, [user])

    useEffect(() => {
        async function createFinalOrder()  {
            const isStripe = JSON.parse(localStorage.getItem('stripe'))
            if (isStripe && params.get('status') === 'success' && cartItems && cartItems.length > 0) {
                setIsProcessing(true)
                const getCheckoutFormData = JSON.parse(localStorage.getItem('checkoutFormData'))

                const createFinal = {
                    user: user?._id,
                    shippingAddress: getCheckoutFormData.shippingAddress,
                    orderItems: cartItems.map(item => ({
                        qty: 1,
                        product: item.productID
                    })),
                    paymentMethod: 'stripe',
                    totalPrice: cartItems && cartItems.length ? (
                                    cartItems.reduce((total, item) => item.productID.price + total, 0)
                                ) : (0),
                    isPaid: true,
                    isProcessing: true,
                    paidAt: new Date()
                }
                const res = await createOrder(createFinal)
                if (res.success) {
                    setIsProcessing(false)
                    setOrderSuccess(true)

                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                } else {
                    setIsProcessing(false)
                    setOrderSuccess(false)
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }
        }

        createFinalOrder()
    }, [params.get('status'), cartItems])

    const handleSelected = (getAddress) => {
        if (getAddress._id === selected) {
            setSelected(null)
            setCheckoutFormData({
                ...checkoutFormData,
                shippingAddress: {}
            })
            return
        }
        setSelected(getAddress._id)
        setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {
                ...checkoutFormData.shippingAddress,
                fullName: getAddress.fullName,
                address: getAddress.address,
                city: getAddress.city,
                country: getAddress.country,
                postalCode: getAddress.postalCode
            }
        })
    }

    const handlePayment = async() => {
        const stripe = await stripePromise

        const createLineItems = cartItems.map(item => ({
            price_data: {
                currency: 'zar',
                product_data: {
                    images: [item.productID.imageUrl],
                    name: item.productID.name
                },
                unit_amount: item.productID.price * 100
            },
            quantity: 1
        }))

        const res = await callStripeSession(createLineItems)
        setIsProcessing(true)
        localStorage.setItem('stripe', true)
        localStorage.setItem('checkoutFormData', JSON.stringify(checkoutFormData))

        const {error} = await stripe.redirectToCheckout({
            sessionId: res.id
        })

        console.log(error);
    }

    useEffect(() => {
        if (orderSuccess) {
            setTimeout(() => {
                setOrderSuccess(false)
                router.push('/orders')
            }, [2500])
        }
    }, [orderSuccess])

    if (cartItems.length === 0) {
        return (
            <section className="h-screen bg-gray-200">
                <div className="mx-auto px-4 sm:px-6 lg:px8">
                    <div className="mx-auto mt-8 max-w-screen-xl px-4 lg:px8">
                        <div className="bg-white shadow-xl rounded-xl">
                            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                                <h1 className="font-bold text-lg">Your payment is successful</h1>
                                <button
                                    type='button' className={styles.checkout}
                                    onClick={() => router.push('/orders')}
                                >
                                    View Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (isProcessing) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <PageLevelLoader 
                    color={'#000000'}
                    loading={isProcessing}
                    size={20} 
                />
            </div>
        )
    }

    return (
        <div className="mt-10 grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mb-10">
            <div className="px-4 pt-8">
                <p className="font-medium text-xl">Cart Summary</p>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5 shadow-xl ">
                    {
                        cartItems && cartItems.length ? 
                        cartItems.map(item => 
                            <div key={item._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img 
                                    src={item && item.productID && item.productID.imageUrl}
                                    alt='Cart Item'
                                    className="ml-2 h-24 w-28 rounded-md border object-cover object-center"
                                />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-bold">{item && item.productID && item.productID.name}</span>
                                    <span className="font-semibold">R {item && item.productID && item.productID.price}</span>
                                </div>
                            </div>    
                        ) :
                        <div>Cart is empty</div>
                    }
                </div>
            </div>
            <div className="mt-16 bg-gray-50 px-4 pt-8 lg:mt-0 shadow-xl py-8 rounded-xl border border-gray-500 ml-10 mr-10">
                <p className="text-xl font-medium">Shipping address details</p>
                <p className="text-gray-500 font-bold">Select address</p>
                {
                    pageLevelLoader ? (
                        <PageLevelLoader 
                            color={'#000000'}
                            loading={pageLevelLoader}
                            size={20}
                        />
                    ) : (
                        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
                            {
                                addressList && addressList.length ? (
                                    addressList.map(address => 
                                        <div
                                            onClick={() => handleSelected(address)} 
                                            className={`border p-6 rounded-xl ${address._id === selected ? 'border-gray-800' : ''}`} 
                                            key={address._id}
                                        >
                                            <p>Name: {address.fullName}</p>
                                            <p>Address: {address.address}</p>
                                            <p>City: {address.city}</p>
                                            <p>Country: {address.country}</p>
                                            <p>Postal Code: {address.postalCode}</p>
                                            {/* <button type='button' className={styles.button}>Select Address</button> */}
                                        </div>  
                                    )
                                ) : <p>No address found</p>
                            }
                        </div>
                    )
                }
                <button type='button' onClick={() => router.push('/account')} className={styles.button}>Add New Address</button>
                <div className="mt-6 border-t border-b border-gray-400 py-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">SubTotal</p>
                        <p className="text-lg font-bold text-gray-900">
                            R {
                                cartItems && cartItems.length ? (
                                    cartItems.reduce((total, item) => item.productID.price + total, 0)
                                ) : '0'
                            }
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p  className="text-lg font-bold text-gray-900">Free</p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-lg font-bold text-gray-900">
                            R {
                                cartItems && cartItems.length ? (
                                    cartItems.reduce((total, item) => item.productID.price + total, 0)
                                ) : '0'
                            }
                        </p>
                    </div>
                </div>
                <button 
                    disabled={(cartItems && cartItems.length === 0 || Object.keys(checkoutFormData.shippingAddress).length === 0)} 
                    type='button' className={styles.checkout}
                    onClick={handlePayment}
                >
                    Checkout
                </button>
            </div>
            <Notification />
        </div>
    )
}