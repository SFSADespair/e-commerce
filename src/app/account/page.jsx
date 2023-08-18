'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import ComponentLevelLoader from "@/components/Loader/componentlevel"
import PageLevelLoader from "@/components/Loader/pagelevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { addAddress, deleteAddress, getAddressList, updateAddress } from "@/services/address"
import { addNewAddressFormControls } from "@/utils"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const styles = {
    button: 'mt-5 mb-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl',
    delete: 'ml-5 mt-5 mb-5 inline-block bg-red-600 px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl'
}

export default function Account() {
    const { 
        user,
        componentLevelLoader, setComponentLevelLoader, 
        addressList, setAddressList,
        addressFormData, setAddressFormData,
        pageLevelLoader, setpageLevelLoader 
    } = useContext(GlobalContext)

    const router = useRouter()

    const [showForm, setShowForm] = useState(false)
    const [currentUpdatedAddressId,  setCurrentUpdatedAddressId] = useState(null)

    const getAddresses = async() => {
        setpageLevelLoader(true)
        const res = await getAddressList(user?._id)
        if (res.success) {
            setpageLevelLoader(false)
            setAddressList(res.data)
        }
    }

    const handleAddOrUpdateAddress = async() => {
        setComponentLevelLoader({ loading: true, id: ''})
        const res = currentUpdatedAddressId !== null ? 
        await updateAddress({ _id: currentUpdatedAddressId, ...addressFormData }) : 
        await addAddress({
            userID: user?._id,
            ...addressFormData
        })
        if (res.success) {
            setComponentLevelLoader({loading: false, id: ''})
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            }) 
            setAddressFormData({
                fullName: '',
                address: '',
                city: '',
                country: '',
                postalCode: ''
            })   
            getAddresses()
            setCurrentUpdatedAddressId(null)
            setShowForm(false)
        } else {
            setComponentLevelLoader({loading: false, id: ''})
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setAddressFormData({
                fullName: '',
                address: '',
                city: '',
                country: '',
                postalCode: ''
            })
            setCurrentUpdatedAddressId(null)
        }
    }

    const handleDelete = async(id) => {
        setComponentLevelLoader({ loading: true, id: id})
        const res = await deleteAddress(id)
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            getAddresses()
        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    const handleUpdate = async(currentAddress) => {
        setShowForm(true)
        setAddressFormData({
            fullName: currentAddress.fullName,
            address: currentAddress.address,
            city: currentAddress.city,
            country: currentAddress.country,
            postalCode: currentAddress.postalCode
        })
        setCurrentUpdatedAddressId(currentAddress._id)
    }

    useEffect(() => {
        if (user !== null)
            getAddresses()
    }, [user])

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
                        <button className={styles.button} onClick={() => router.push('/orders')}>View your orders</button>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Your Address List:</h1>
                            {
                                pageLevelLoader ? (
                                    <PageLevelLoader 
                                        color={'#000000'}
                                        loading={pageLevelLoader}
                                        size={20}
                                    />
                                ) : (
                                    <div className="mt-4 flex flex-col gap-4">
                                        {
                                            addressList && addressList.length ?
                                            addressList.map(address =>
                                                <div className="border p-6 rounded-xl" key={address._id}>
                                                    <p>Name: {address.fullName}</p>
                                                    <p>Address: {address.address}</p>
                                                    <p>City: {address.city}</p>
                                                    <p>Country: {address.country}</p>
                                                    <p>Postal Code: {address.postalCode}</p>
                                                    <button onClick={() => handleUpdate(address)} type='button' className={styles.button}>Update</button>
                                                    <button onClick={() => handleDelete(address._id)} type='button' className={styles.delete}>
                                                        {
                                                            componentLevelLoader && componentLevelLoader.loading
                                                            && address._id === componentLevelLoader.id ? (
                                                                <ComponentLevelLoader 
                                                                    color={'#fff'}
                                                                    loading={componentLevelLoader && componentLevelLoader.loading}
                                                                />
                                                            ) : 'Delete'
                                                        }
                                                    </button>
                                                </div>    
                                            ) : <p>No Address found! Please add one.</p>
                                        }
                                    </div>
                                )
                            }
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
                                    <button onClick={handleAddOrUpdateAddress} className={styles.button}>
                                        {
                                            componentLevelLoader && componentLevelLoader.loading ?
                                            (
                                                <ComponentLevelLoader 
                                                    color={'#fff'}
                                                    loading={componentLevelLoader && componentLevelLoader.loading}
                                                />
                                            ) : 'Submit'
                                        }
                                    </button>
                                </div>
                            ) : null
                        }

                        
                    </div>
                </div>
            </div>
            <Notification />
        </section>
    )
}