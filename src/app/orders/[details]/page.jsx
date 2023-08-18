'use client'

import PageLevelLoader from "@/components/Loader/pagelevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { ordrDetails } from "@/services/orders"
import { useParams, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"

const styles = {
    button: 'mt-5 mb-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl',
}


export default function Details() {
    const {
        user,
        pageLevelLoader, setpageLevelLoader,
        orderDetails, setOrderDetails
    } = useContext(GlobalContext)
    
    const params = useParams()
    const router = useRouter()

    const getOrderDetails = async() => {
        setpageLevelLoader(true)

        const res = await ordrDetails(params.details)
        if (res.success) {
            setpageLevelLoader(false)
            setOrderDetails(res.data)
        } else {
            setpageLevelLoader(false)
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    useEffect(() => {
        getOrderDetails()
    }, [])

    if (pageLevelLoader) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <PageLevelLoader 
                    color={'#000000'}
                    loading={pageLevelLoader}
                    size={20} 
                />
            </div>
        )
    }

    return (
        <div className="py-14 px-4 md:px-6 max-h-screen-xl">
            <div className="bg-white border border-gray-300 shadow-xl px-6 py-8 rounded-xl">
            <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-900 overflow-hidden text-ellipsis">
                        Order #{orderDetails?._id}
                    </h1>
                    <p className="text-base font-medium leading-6 text-gray-600">
                        {
                            orderDetails && orderDetails.createdAt && orderDetails.createdAt.split('T')[0]
                            
                        } | {
                            orderDetails && orderDetails.createdAt && orderDetails.createdAt.split('T')[1].split('.')[0]
                        }
                    </p>
                </div>
                <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full mb-5 space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-500 px-4 py-4 md:p-6 xl:p-8 w-full rounded-lg">
                            <p className="font-bold text-lg">Your Order Summary</p>
                            {
                                orderDetails && orderDetails.orderItems && orderDetails.orderItems.length ?
                                orderDetails.orderItems.map(item => (
                                    <div key={item._id}
                                        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                                    >
                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                            <img 
                                                src={item && item.product && item.product.imageUrl}
                                                className="w-full hidden md:block border border-gray-50 rounded-xl"
                                            />
                                        </div>
                                        <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 className="text-xl font-semibold leading-6 text-gray-800">
                                                {item && item.product && item.product.name}
                                                </h3>
                                            </div>
                                            <div className="w-full flex justify-between items-start space-x-8">
                                                <h3 className="text-xl font-semibold leading-6 text-gray-800">
                                                R{item && item.product && item.product.price}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                )) : null
                            }
                        </div>
                        <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 border border-gray-300 rounded-xl space-y-6">
                                <h3 className="text-xl font-semibold leading-6 text-gray-800">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-300 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-base leading-5 text-gray-800">Subtotal</p>
                                        <p className="text-base leading-5 text-gray-900">R{orderDetails && orderDetails.totalPrice}</p>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-base leading-5 text-gray-800">Shipping</p>
                                        <p className="text-base leading-5 text-gray-900">Free </p>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <p className="text-base leading-5 text-gray-800">Total</p>
                                        <p className="text-base leading-5 text-gray-900">R{orderDetails && orderDetails.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="bg-gray-50 rounded-lg w-full xl:w-96 flex items-center md:items-start px-4 mb-5 py-4 flex-col">
                            <h3 className="text-xl font-semibold leading-6 text-gray-800">Customer Details</h3>
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex gap-4 justify-center flex-col w-full md:justify-start py-8 border-b border-gray-200">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-950">Name: {user?.name}</p>
                                    <p className="text-base font-semibold leading-4 text-left text-gray-950">Email: {user?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-4 py-4 flex justify-between xl:h-full items-stretch wifull flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-row items-center md:items-start">
                                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p>Shiiping Address</p>
                                    <p>Address: {orderDetails && orderDetails.shippingAddress.address}</p>
                                    <p>City: {orderDetails && orderDetails.shippingAddress.city}</p>
                                    <p>Country: {orderDetails && orderDetails.shippingAddress.country}</p>
                                    <p>Postal Code: {orderDetails && orderDetails.shippingAddress.postalCode}</p>
                                </div>
                            </div>
                        </div>
                        <button className={styles.button} onClick={() => router.push(`/`)}>
                            Shop Again
                        </button>
                    </div>

                </div>
            </div>
            <Notification />
        </div>
    )
}