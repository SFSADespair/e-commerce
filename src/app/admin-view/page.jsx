'use client'

import ComponentLevelLoader from "@/components/Loader/componentlevel"
import PageLevelLoader from "@/components/Loader/pagelevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { adminUserOrders, updateOrderStatus } from "@/services/orders"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { toast } from "react-toastify"

//CSS Styles
const styles = {
    button: 'disabled:opacity-50 mt-5 mb-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl',
}

export default function AdminView() {
    const {
        user,
        pageLevelLoader, setpageLevelLoader,
        componentLevelLoader, setComponentLevelLoader,
        adminOrders, setAdminOrders
    } =  useContext(GlobalContext)

    const router = useRouter()

    //Get all the users' orders except the current user's
    const getOrders = async() => {
        setpageLevelLoader(true)

        const res = await adminUserOrders()
        if (res.success) {
            setpageLevelLoader(false)
            setAdminOrders(
                res.data && res.data.length ? 
                res.data.filter(item => 
                        item.user._id  !== user._id
                    ) 
                : []) //The current admin cannot see his own orders, so filter it.
        } else {
            setpageLevelLoader(false)
        }
    }

    //Update the order process
    const handleUpdate = async(order) => {
        setComponentLevelLoader({loading: true, id: order._id})

        const res = await updateOrderStatus({   
            ...order,
            isProcessing: false
        })

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            getOrders()
            setComponentLevelLoader({loading: false, id: ''})

        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setComponentLevelLoader({loading: false, id: ''})
        }
    }

    //Get orders whenever user changes
    useEffect(() => {
        if (user !== null)
            getOrders()
    }, [user])

    //Show pulse loader when pageLevelLoader is false
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
        <>
            <section className="max-h-screen-xl">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                {
                                    adminOrders && adminOrders.length ? (
                                        <ul className="flex flex-col gap-4">
                                            {
                                                adminOrders.map(order => (
                                                    <li key={order._id} className="bg-white shadow-xl rounded-xl p-5 flex flex-col space-y-3 py-6 text-left border border-gray-200">
                                                        <div className="flex">
                                                            <h1 className="font-bold text-lg mb-3 flex-1 overflow-hidden text-ellipsis">#order: {order._id}</h1>
                                                           <div className="flex flex-col gap-2">
                                                                <div className="flex items-center">
                                                                    <p className="mr-3 text-sm font-medium text-gray-900">User Name</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{order.user.name}</p>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <p className="mr-3 text-sm font-medium text-gray-900">User Email</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{order.user.email}</p>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <p className="mr-3 text-sm font-medium text-gray-900">Total paid Amount</p>
                                                                    <p className="text-sm font-semibold text-gray-900">R{order.totalPrice}</p>
                                                                </div>
                                                           </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {
                                                                order.orderItems.map((orderItem, index) => (
                                                                    <div key={index} className="shrink-0">
                                                                        <img 
                                                                            src={orderItem && orderItem.product && orderItem.product.imageUrl} 
                                                                            className="h-24 w-24 max-w-full rounded-lg object-cover hidden md:block border border-gray-50"
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
                                                            <button className={styles.button} 
                                                                //Disable button if order is delivered 
                                                                disabled={!order.isProcessing}
                                                                onClick={() => handleUpdate(order)}
                                                            >
                                                                {
                                                                    componentLevelLoader && componentLevelLoader.loading 
                                                                    && componentLevelLoader.is === order._id ? (
                                                                        <ComponentLevelLoader 
                                                                            color={'#ffff'}
                                                                            loading={componentLevelLoader && componentLevelLoader.loading}
                                                                        />
                                                                    ) :
                                                                    'Update Order Status'
                                                                }
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
                <Notification />
            </div>
        </section>
        </>
    )
}