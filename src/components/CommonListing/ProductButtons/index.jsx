'use client'

import { usePathname } from "next/navigation"

export default function ProductButtons({item}) {
    const pathName = usePathname()
    
    const isAdminView = pathName.includes('admin-view')
    const styles = {
        button: `mt-1.5 flex items-center justify-center bg-black px-5 py-3 text-xs font-medium 
                uppercase tracking-wide text-white rounded-full`,
        delete: `mt-1.5 flex items-center justify-center bg-red-400 px-5 py-3 text-xs font-medium 
                 uppercase tracking-wide text-black rounded-full`
    }

    return isAdminView ? (
        <>
            <button className={styles.button}>Update</button>
            <button className={styles.delete}>Delete</button>
        </>
    ) : (
        <>
            <button className={styles.button}>Add To Cart</button>
        </>
    )
}