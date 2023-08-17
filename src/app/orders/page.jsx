'use client'

import PageLevelLoader from "@/components/Loader/pagelevel"
import { GlobalContext } from "@/context"
import { allOrders } from "@/services/orders"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"

const styles = {
    button: 'mt-5 mb-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl',
}

export default function Orders() {
    const { 
        user, 
        pageLevelLoader, setpageLevelLoader,
        allUserOrders, setAllUserOrders
    } = useContext(GlobalContext)

    const getOrders = async() => {
        setpageLevelLoader(true)
        const res = await allOrders(user?._id)
        if (res.success) {
            setAllUserOrders(res.data)
            setpageLevelLoader(false)
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setpageLevelLoader(false)
        }
    }

    useEffect(() => {
        if (user !== null) getOrders()
    }, [user])

    console.log(allUserOrders)

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
        <section className="max-h-screen-xl">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                {
                                    allUserOrders && allUserOrders.length ? (
                                        <ul className="flex flex-col gap-4">
                                            {
                                                allUserOrders.map(order => (
                                                    <li key={order._id} className="bg-white shadow-xl rounded-xl p-5 flex flex-col space-y-3 py-6 text-left border border-gray-200">
                                                        <div className="flex">
                                                            <h1 className="font-bold text-lg mb-3 flex-1 overflow-hidden text-ellipsis">#order: {order._id}</h1>
                                                            <div className="flex flex-col items-center">
                                                                <p className="mr-5 text-sm font-medium text-gray-900">Total paid amount</p>
                                                                <p className="mr-5 text-2xl font-semibold text-gray-900">R{order.totalPrice}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {
                                                                order.orderItems.map((orderItem, index) => (
                                                                    <div key={index} className="shrink-0">
                                                                        <img 
                                                                            src={orderItem && orderItem.product && orderItem.product.imageUrl} 
                                                                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                                            alt='Order Item'
                                                                        /> 
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="flex gap-5">
                                                            <button className={styles.button}>
                                                                {order.isProcessing ? 'Order is Processing' : 'Delivered'}
                                                            </button>
                                                            <button className={styles.button}>
                                                                View Order Details
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}