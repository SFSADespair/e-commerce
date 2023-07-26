'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import TileComponent from "@/components/FormElements/TileComponent"
import { helperUploadImage } from "@/firebase"
import { adminAddPorductFormControls, availableSizes } from "@/utils"

export default function AdminAddNewProduct() {  
    const handleImage = async(e) => {
        const imageUrl = await helperUploadImage(e.target.files[0])
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
                            <TileComponent data={availableSizes}/>
                        </div>
                        {
                            adminAddPorductFormControls.map(controlItem => 
                                controlItem.componnentType === 'input' ? (
                                    <InputComponent 
                                        key={controlItem.id}
                                        type={controlItem.type}
                                        label={controlItem.label}
                                        placeholder={controlItem.placeholder}
                                    />
                                ) : controlItem.componnentType === 'select' ?  (
                                    <SelectComponent 
                                        key={controlItem.id}
                                        label={controlItem.label}
                                        options={controlItem.options}
                                    />
                                ) : null
                            )
                        }
                        <button className={styles.button}>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}