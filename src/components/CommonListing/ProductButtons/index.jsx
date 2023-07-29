'use client'

import ComponentLevelLoader from "@/components/Loader/componentlevel"
import { GlobalContext } from "@/context"
import { deleteProduct } from "@/services/product"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "react-toastify"

export default function ProductButtons({item}) {
    const pathName = usePathname()
    const router = useRouter()
    const { setCurrentUProduct, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext)
    
    const isAdminView = pathName.includes('admin-view')
    const styles = {
        button: `mt-1.5 flex items-center justify-center bg-black px-5 py-3 text-xs font-medium 
                uppercase tracking-wide text-white rounded-full`,
        delete: `mt-1.5 flex items-center justify-center bg-red-400 px-5 py-3 text-xs font-medium 
                 uppercase tracking-wide text-black rounded-full`
    }

    const handleDelete = async (itm) => {
        const res = await deleteProduct(itm._id)
        setComponentLevelLoader({loading: true, id: itm._id})
        if(res.success) {
            setComponentLevelLoader({loading: false, id: ''})
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            router.refresh() 
        } else {
            setComponentLevelLoader({loading: false, id: ''})
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    return isAdminView ? (
        <>
            <button
                onClick={()=> {
                    setCurrentUProduct(item)
                    router.push('/admin-view/add-product')
                }} 
                className={styles.button}
            >
                Update
            </button>
            <button 
                onClick={() => handleDelete(item)}
                className={styles.delete}
            >
                {
                    componentLevelLoader && 
                    componentLevelLoader.loading && 
                    item._id === componentLevelLoader.id ? 
                    <ComponentLevelLoader 
                        color={'#fff'}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    /> : 'Delete'
                }
            </button>
        </>
    ) : (
        <>
            <button className={styles.button}>Add To Cart</button>
        </>
    )
}