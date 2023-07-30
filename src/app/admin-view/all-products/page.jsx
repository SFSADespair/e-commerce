import CommonListing from "@/components/CommonListing";
import { getAllProducts } from "@/services/product";

export default async function AdminAllProducts() {
    const adminProducts = await getAllProducts()
    console.log(adminProducts);
    return (
        <>
            <CommonListing data={adminProducts && adminProducts?.data} />
        </>
    )
}