'use client'

export default function Footer() {
    const getYear = () => {
        let now = new Date();
        let year = now.getFullYear();

        return year
    }

    return (
        <>
            <footer>
                <div className="grid grid-col mt-8 p-10 border border-gray-200 justify-center items-center lg:grid-cols-12">
                    <div className="place-self-center col-span-7">
                        <h4 className=" font-bold text-gray-650">Hello World</h4>
                    </div>
                    <div className="place-self-center col-span-4">
                        <h4 className=" font-bold text-gray-650">Contact Us</h4>
                    </div>
                    <div className="place-self-center col-span-12 mt-4">
                        <h4 className=" font-bold text-gray-650">We Accept</h4>
                    </div>
                    <p className="place-self-center col-span-12 mt-4 text-sm font-bold text-gray-650">©2023 - {getYear()} Oompie-Store All Rights Reserved</p>
                </div>
            </footer>
        </>
    )
}