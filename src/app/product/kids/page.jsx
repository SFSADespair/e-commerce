// import CommonListing from "@/components/CommonListing"
import { categoryProduct } from "@/services/product"
import dynamic from "next/dynamic"

const CommonListing = dynamic(() => import("@/components/CommonListing"), {ssr: false})

export default async function KidsProducts() {
    const kidsProducts = await categoryProduct('kids')
    return (
        <>
            <CommonListing data={kidsProducts && kidsProducts.data} />
        </>
    )
}