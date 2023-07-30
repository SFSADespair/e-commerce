import CommonListing from "@/components/CommonListing";
import { categoryProduct } from "@/services/product";


export default async function WomenProducts() {
    const womenProducts = await categoryProduct('women')
    return (
        <>
            <CommonListing data={womenProducts && womenProducts.data} />
        </>
    )
}