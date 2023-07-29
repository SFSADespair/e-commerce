'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import TileComponent from "@/components/FormElements/TileComponent"
import ComponentLevelLoader from "@/components/Loader/componentlevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { helperUploadImage } from "@/firebase"
import { addNewProduct, updateProduct } from "@/services/product"
import { adminAddPorductFormControls, availableSizes } from "@/utils"
import { useRouter } from "next/navigation"
import { useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

const initForm = {
    name: '',
    price: 0,
    description: '',
    category: 'men',
    sizes: [],
    deliveryInfo: '',
    onSale: 'no',
    imageUrl: '',
    priceDrop: 0
}

export default function AdminAddNewProduct() {  
    const [formData, setFormData] = useState(initForm)
    const  { 
        componentLevelLoader, setComponentLevelLoader,
        currentUProduct, setCurrentUProduct
    } = useContext(GlobalContext)
    const router = useRouter()

    useEffect(() => {
        if (currentUProduct !== null)
            setFormData(currentUProduct)
    }, [currentUProduct])

    const handleImage = async(e) => {
        const imgUrl = await helperUploadImage(e.target.files[0])
        if (imgUrl !== '') {
            setFormData({
                ...formData,
                imageUrl: imgUrl
            })
        }
    }

    const handleTile = (getCurrentItem) => {
        let cpySizes = [...formData.sizes]
        const index = cpySizes.findIndex(item => item.id === getCurrentItem.id)

        if(index === -1) {
            cpySizes.push(getCurrentItem)
        } else {
            cpySizes = cpySizes.filter(item => item.id !== getCurrentItem)
        }

        setFormData({
            ...formData,
            sizes: cpySizes
        })
    }

    const handleProduct = async () => {
        setComponentLevelLoader({loading: true, id: ''})
        const res = currentUProduct !== null 
            ? await updateProduct(formData) 
            : await addNewProduct(formData)

        if(res.success) {
            setComponentLevelLoader({loading: false, id: ''})
            setCurrentUProduct(null)
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setFormData(initForm)
            setTimeout(() => {
                router.push('/admin-view/all-products')
            }, 1500)
        } else {
            setComponentLevelLoader({loading: false, id: ''})
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setFormData(initForm)
        }
    }
    

    const styles = {
        button: `disabled:opacity-50 inline-flex w-full items-center justify-center bg-black 
                px-6 py-4 text-lg text-white transition-all duration-200 
                ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
    }

    return (
        <>
            <div className=" mt-5 mr-5 mb-10 ml-5 relative">
                <div className='flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative'>
                    <div className='w-full mt-6 mr-0 mb-0 ml-0 space-y-8'>
                        <input 
                            accept='image/*'
                            max='1000000'
                            type='file'
                            onChange={handleImage}
                        />

                        <div className="flex gap-2 flex-col">
                            <label>Available Sizes</label>
                            <TileComponent 
                                selected={formData.sizes}
                                onClick={handleTile} 
                                data={availableSizes}
                            />
                        </div>
                        {
                            adminAddPorductFormControls.map(controlItem => 
                                controlItem.componnentType === 'input' ? (
                                    <InputComponent 
                                        key={controlItem.id}
                                        type={controlItem.type}
                                        label={controlItem.label}
                                        placeholder={controlItem.placeholder}
                                        value={formData[controlItem.id]}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                [controlItem.id]: e.target.value
                                            })
                                        }}
                                    />
                                ) : controlItem.componnentType === 'select' ?  (
                                    <SelectComponent 
                                        key={controlItem.id}
                                        label={controlItem.label}
                                        options={controlItem.options}
                                        value={formData[controlItem.id]}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                [controlItem.id]: e.target.value
                                            })
                                        }}
                                    />
                                ) : null
                            )
                        }
                        <button 
                            onClick={handleProduct}
                            className={styles.button}
                        >
                            {
                                componentLevelLoader && componentLevelLoader.loading ?
                                <ComponentLevelLoader 
                                    color={'#fff'}
                                    loading={componentLevelLoader && componentLevelLoader.loading}
                                /> : (
                                    currentUProduct !== null 
                                        ? 'Update' 
                                        : 'Add Product'
                                )
                            }
                        </button>
                    </div>
                </div>
                <Notification />
            </div>
        </>
    )
}