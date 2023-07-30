import CommonListing from "@/components/CommonListing";
import { categoryProduct } from "@/services/product";


export default async function MenProducts() {
    const menProducts = await categoryProduct('men')
    return (
        <>
            <CommonListing data={menProducts && menProducts.data} />
        </>
    )
}