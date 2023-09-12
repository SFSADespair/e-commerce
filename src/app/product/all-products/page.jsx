// import CommonListing from "@/components/CommonListing"
import { getAllProducts } from "@/services/product"
import dynamic from "next/dynamic"

//Client Components
const CommonListing = dynamic(() => import("@/components/CommonListing"), {ssr: false})

export default async function AllProducts() {
    const allProducts = await getAllProducts()
    return (
        <>
            <CommonListing data={allProducts && allProducts.data} />
        </>
    )
}