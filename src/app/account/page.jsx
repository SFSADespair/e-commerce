'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import { GlobalContext } from "@/context"
import { addNewAddressFormControls } from "@/utils"
import { useContext, useState } from "react"

const styles = {
    button: 'mt-5 mb-5 inline-block hover:bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-black text-black hover:text-white rounded-3xl'
}

export default function Account() {
    const { 
        user,
        addressList, setAddressList,
        addressFormData, setAddressFormData 
    } = useContext(GlobalContext)

    const [showForm, setShowForm] = useState(false)

    return (
        <section className="">
            <div className="mx-auto mt-20 mb-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-xl">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                            {/* generates random user image */}

                        </div>
                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold text-center md:text-left">{user?.name}</h4>
                            <p>Email: {user?.email}</p>
                            <p>Role: {user?.role}</p>
                        </div>
                        <button className={styles.button}>View your orders</button>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Your Addresses:</h1>
                            <div className="mt-4">
                                {
                                    addressList && addressList.length ?
                                    addressList.map(address =>
                                        <div className="border p-6" key={address._id}>
                                            <p>Name: {address.fullName}</p>
                                            <p>Address: {address.address}</p>
                                            <p>City: {address.city}</p>
                                            <p>Country: {address.country}</p>
                                            <p>Postal Code: {address.postalCode}</p>
                                        </div>    
                                    ) : <p>No Address found! Please add one.</p>
                                }
                            </div>
                        </div>
                        {/* Toggle form */}
                        <div className="mt-4">
                            <button onClick={() => setShowForm(prv => !prv)} className={styles.button}>
                                {showForm ? 'Hide Form' : 'Add Address'}
                            </button>
                        </div>
                        {
                            showForm ? (
                                <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                        {
                                            addNewAddressFormControls.map(controlItem => 
                                                <InputComponent 
                                                    type={controlItem.type}
                                                    placeholder={controlItem.placeholder}
                                                    label={controlItem.label}
                                                    value={addressFormData[controlItem.id]}
                                                    onChange={(e) => setAddressFormData({
                                                        ...addressFormData,
                                                        [controlItem.id]: e.target.value
                                                    })}
                                                />    
                                            )
                                        }
                                    </div>
                                    <button className={styles.button}>Add</button>
                                </div>
                            ) : null
                        }

                        
                    </div>
                </div>
            </div>
        </section>
    )
}