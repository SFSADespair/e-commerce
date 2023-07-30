import CommonListing from "@/components/CommonListing"
import { categoryProduct } from "@/services/product"

export default async function KidsProducts() {
    const kidsProducts = await categoryProduct('kids')
    return (
        <>
            <CommonListing data={kidsProducts && kidsProducts.data} />
        </>
    )
}