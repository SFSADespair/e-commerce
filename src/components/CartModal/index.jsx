'use client'

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteCartItem, getCartItems } from "@/services/cart";
import Image from "next/image";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";

const styles = {
    cart: 'mt-1.5 w-full inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-3xl',
    checkout: 'mt-1.5 w-full inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-3xl disabled:opacity-50',
    remove: 'font-medium text-yellow-600 sm:order-2 hover:border hover:rounded-3xl hover:inline-block hover:px-3 hover:py-1'
}

//mainContent
const MainContent = ({cartItems, componentLevelLoader, setComponentLevelLoader, getCart}) => {
    const handleRemove = async (id) => {
        setComponentLevelLoader({ loading: true, id: id})

        const res = await deleteCartItem(id)
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            getCart()
        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    return (
        <>
            {
                cartItems && cartItems.length ? (
                    <ul role="list" className="my-6 divide-y divide-gray-300">
                        {
                            cartItems.map(item => (
                                <li key={item.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <Image 
                                            src={item && item.productID && item.productID.imageUrl}
                                            height={150}
                                            width={300}
                                            alt="Product Image"
                                            className='h-full w-full object-cover object-center'
                                        />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href="#">
                                                        {item && item.productID && item.productID.name}
                                                    </a>
                                                </h3>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">${item && item.productID && item.productID.price}</p>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <button 
                                                    type='button' 
                                                    onClick={() => handleRemove(item._id)}
                                                    className={styles.remove}
                                                >
                                                    {
                                                        componentLevelLoader  && componentLevelLoader.loading
                                                        && componentLevelLoader.id === item._id ? 
                                                        <ComponentLevelLoader 
                                                            color={'#000000'}
                                                            loading={componentLevelLoader && componentLevelLoader.loading}
                                                        /> : 'Remove'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                ) : null
            
            }
        </>
    )
}

export default function CartModal() {
    const {
        showCartModel, setShowCartModel, 
        user,
        cartItems, setCartItems,
        componentLevelLoader, setComponentLevelLoader
    } = useContext(GlobalContext)
    
    const getCart = async() => {
        const res = await getCartItems(user?._id)
        if(res.success) {
            setCartItems(res.data)
            localStorage.setItem('cartItems', JSON.stringify(res.data))
        }
        console.log(res);
    }

    useEffect(() => {
        if (user !== null)
            getCart()
    }, [user])


    return (
        <>
            <CommonModal 
                showButtons={true}
                mainContent={<MainContent 
                                cartItems={cartItems} 
                                componentLevelLoader={componentLevelLoader} 
                                setComponentLevelLoader={setComponentLevelLoader}
                                getCart={getCart}
                            />}
                buttonComponent={
                    <Fragment>
                        <button 
                            type='button' 
                            className={styles.cart}
                        >
                            Go to cart
                        </button>
                        <button 
                            disabled={cartItems && cartItems.length === 0}
                            type='button' 
                            className={styles.checkout}
                        >
                            Check Out
                        </button>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                            <button type='button' className='font-medium text-gray'>
                                Continue Shopping 
                                <span aria-hidden='true'> &rarr;</span>
                            </button>
                        </div>
                    </Fragment>
                }
                show={showCartModel} 
                setShow={setShowCartModel} 
            />
        </>
    )
}