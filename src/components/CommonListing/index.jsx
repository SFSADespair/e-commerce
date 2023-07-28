'use client'

import ProductButtons from "./ProductButtons"
import ProductTile from "./ProductTile"


const dummyData = [
    {
        _id: '64c2d0ac764ee9d57c8611b7',
        name: "Code",
        description: "Selling code for any task you want it to execute in JAVA",
        price: 200,
        category: "men",
        sizes: [
            {
                id: 'l', 
                label: 'L' 
            }
        ],
        deliveryInfo: "Free",
        onSale: "no",
        priceDrop: 0,
        imageUrl: 
            "https://firebasestorage.googleapis.com/v0/b/nextjs-ecommerce-df411.appspot.com/o/ecommerce%2FScreenshot%202023-03-10%20153450.png-1690488969192-hf7igrdwpo?alt=media&token=ad967834-4de7-4b20-9edf-2cd9cc25bac2",
    }
]

export default function CommonListing() {
    return (
        <section className="bg-white rounded-lg mt-6 ml-8 mr-8 sm:py-16">
            <div className="mx-8 my-24 px-4 sm:px-6">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
                    {
                        dummyData && dummyData.length ?
                        dummyData.map((item, i) => (
                            <>
                                <article 
                                    key={i}
                                    className="relative flex flex-col overflow-hidden border cursor-pointer rounded-lg"
                                >
                                    <ProductTile 
                                        item={item}
                                    />
                                    <ProductButtons item={item} />
                                </article> 
                            </>
                        )) : null
                    }
                </div>
            </div>
        </section>
    )
}