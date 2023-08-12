'use client'

import Image from "next/image"
import ComponentLevelLoader from "../Loader/componentlevel"

const styles = {
    remove: `font-medium text-yellow-700 sm:order-2`,
    checkout: `disabled:opacity-50 group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 
                ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}


export default function CommonCart({ cartItems, handleRemove, componentLevelLoader }) {
    return (
        <section className="mb-8">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-8 mx-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-2xl rounded-xl mt-20">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root ">
                                {
                                    cartItems && cartItems.length ?
                                    <ul className="my-8">
                                        {cartItems.map(cartItem => (
                                            <li 
                                                key={cartItem.id}
                                                className="flex-col flex-space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                                            >
                                                <div className="shrink-0">
                                                    <Image 
                                                        src={cartItem && cartItem.productID && cartItem.productID.imageUrl}
                                                        width={200}
                                                        height={300}
                                                        alt="Product Image"
                                                        className="h-24 w-25 max-w-full rounded-lg object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between">
                                                    <div className="sm:cols-gap-5 sm:grid-cols-2">
                                                        <div className="pr-8 sm:pr-4">
                                                            <p className="text-base font-semibold text-gray-900">
                                                                {cartItem && cartItem.productID && cartItem.productID.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                        <p className="shrink-0 w-20 text-baase font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                                            R{cartItem && cartItem.productID && cartItem.productID.price}
                                                        </p>
                                                        <button 
                                                            type='button' 
                                                            className={styles.remove}
                                                            onClick={() => handleRemove(cartItem._id)}
                                                        >
                                                            {
                                                                componentLevelLoader && componentLevelLoader.loading
                                                                && componentLevelLoader.id === cartItem._id ?
                                                                <ComponentLevelLoader 
                                                                    color={'#000000'}
                                                                    loading={componentLevelLoader && componentLevelLoader.loading}
                                                                /> : 'Remove'
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul> : <h1 className="font-bold text-lg">Your cart is empty</h1>
                                }
                            </div>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Subtotal</p>
                                    <p className="text-lg text-black font-semibold">
                                        R{
                                            cartItems && cartItems.length ? 
                                            cartItems.reduce(
                                                (total, item) => item.productID.price + total,
                                                 0
                                            ) : "0"
                                        }
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Shipping</p>
                                    <p className="text-lg text-black font-semibold">
                                        Free
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400">Total</p>
                                    <p className="text-lg text-black font-semibold">
                                        R{
                                            cartItems && cartItems.length ? 
                                            cartItems.reduce(
                                                (total, item) => item.productID.price + total,
                                                 0
                                            ) : "0"
                                        }
                                    </p>
                                </div>
                                <div className="mt-5 text-center">
                                    <button 
                                        disabled={cartItems && cartItems.length === 0} 
                                        type='button' 
                                        className={styles.checkout}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}