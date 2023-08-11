'use client'

import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";

const styles = {
    cart: 'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-3xl',
    checkout: 'mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-3xl ml-2'
}

export default function CartModal() {
    const {showCartModel, setShowCartModel} = useContext(GlobalContext)
    return (
        <>
            <CommonModal 
                showButtons={true}
                buttonComponent={
                    <Fragment>
                        <button className={styles.cart}>Go to cart</button>
                        <button className={styles.checkout}>Check Out</button>
                    </Fragment>
                }
                show={showCartModel} 
                setShow={setShowCartModel} 
            />
        </>
    )
}