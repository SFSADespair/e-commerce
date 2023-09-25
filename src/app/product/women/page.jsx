// import CommonListing from "@/components/CommonListing";
import { categoryProduct } from "@/services/product";
import dynamic from "next/dynamic";

const CommonListing = dynamic(() => import("@/components/CommonListing"), {ssr: false});

export default async function WomenProducts() {
    const womenProducts = await categoryProduct('women')
    return (
        <>
            <CommonListing data={womenProducts && womenProducts.data} />
        </>
    )
}