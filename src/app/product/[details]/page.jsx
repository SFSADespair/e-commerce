import CommonDetails from "@/components/CommonDetails"
import { getProduct } from "@/services/product"

export default async function ProductDetails({params}) {
    const productDetails = await getProduct(params.details)
    console.log(productDetails.data.imageUrl);
    return (
        <>
            <CommonDetails item={productDetails && productDetails.data} />
        </>
    )
}