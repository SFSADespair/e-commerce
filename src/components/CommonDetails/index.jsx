'use client'

import { GlobalContext } from "@/context"
import { addToCart } from "@/services/cart"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "react-toastify"
import ComponentLevelLoader from "../Loader/componentlevel"
import Notification from "../Notification"
import Comments from "../Comments"


export default function CommonDetails({ item }) {
    const router = useRouter()

    const { 
        componentLevelLoader, setComponentLevelLoader, 
        showCartModel, setShowCartModel,
        user
    } = useContext(GlobalContext)

    const handleAddCart = async(itm) => {
        setComponentLevelLoader({ loading: true, id: itm._id })

        const res = await addToCart({
            userID: user._id,
            productID: itm._id
        })
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setShowCartModel(true)
        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setShowCartModel(true)
        }
    }

    return (
        <>
            <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-16">
                <div className="container mx-auto px-4">
                    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16 border-b border-gray-400">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="mx-w-xl overflow-hidden rounded-lg">
                                        <img
                                            src={item.imageUrl}
                                            className="h-full w-full max-w-full object-cover"
                                            alt="Product Details"
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                    <div className="flex flex-row items-start lg:flex-col">
                                        <button
                                            type='button'
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                                        >
                                            <img
                                                src={item.imageUrl}
                                                className="h-full w-full object-cover"
                                                alt="Product Details"
                                            />
                                        </button>
                                        <button
                                            type='button'
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                                        >
                                            <img
                                                src={item.imageUrl}
                                                className="h-full w-full object-cover"
                                                alt="Product Details"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2 mb-20">
                            <h1 className="text-2xl font-bold text-gray-900 ">
                                {item && item.name}
                            </h1>
                            <div className="mt-10 grid flex-cols items-center justify-between space-y-4 border-t border-b py-4 lg:flex-row sm:space-y-0">
                                <div className="flex items-end">
                                    <h1 className={`text-3xl font-bold mr-2 ${item.onSale === 'yes' ? 'line-through text-gray-400' : ''}`}>${item && item.price}</h1>
                                    {item.onSale === 'yes' ? (
                                        <h1 className="text-3xl font-bold text-red-700">
                                            {`$${(item.price - (item.price * (item.priceDrop / 100))).toFixed(2)}`}
                                        </h1>
                                    ) : null}
                                </div>
                                <div className="btn">
                                    <button type='button'
                                        onClick={() => handleAddCart(item)}
                                        className="mt-1.5 inline-block rounded-3xl bg-black px-5 py-3 text-xs font-medium tracking-wide uppercaase text-white"
                                    >
                                        {
                                            componentLevelLoader && componentLevelLoader.loading
                                            && componentLevelLoader.id === item._id ? 
                                            <ComponentLevelLoader
                                                color={'#fff'}
                                                loading={componentLevelLoader && componentLevelLoader.loading}                 
                                            /> : 'Add To Cart'
                                        }
                                    </button>
                                </div>
                            </div>
                            <ul className="mt-8 space-y-2">
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">{item && item.deliveryInfo}</li>
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">Cancel Any Time</li>
                            </ul>
                            <div className="lg:col-span-3">
                                <div className="border-b border-gray-400">
                                    <nav className="flex gap-4">
                                        <a href="#" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900">
                                            Description
                                        </a>
                                    </nav>
                                </div>
                                <div className="mt-8 flow-root sm:mt-12">
                                    {item && item.description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-20">
                        <Comments />
                    </div>
                </div>
                <Notification />
            </section>
        </>
    )
}