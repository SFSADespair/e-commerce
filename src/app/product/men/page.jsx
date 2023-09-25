// import CommonListing from "@/components/CommonListing";
import { categoryProduct } from "@/services/product";
import dynamic from "next/dynamic";

const CommonListing = dynamic(() => import("@/components/CommonListing"), {ssr: false});

export default async function MenProducts() {
    const menProducts = await categoryProduct('men')
    return (
        <>
            <CommonListing data={menProducts && menProducts.data} />
        </>
    )
}