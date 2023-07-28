import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AdminAllProducts() {
    const adminProducts = await getAllAdminProducts()
    console.log(adminProducts);
    return (
        <>
            <CommonListing data={adminProducts && adminProducts?.data} />
        </>
    )
}