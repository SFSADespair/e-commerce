'use client'

import { useRouter } from "next/navigation"

const styles = {
    button: 'disabled:opacity-50 mt-5 mb-5 w-full inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide border border-gray-500 text-white rounded-3xl',
}

export default function Unauthorized() {
    const router = useRouter()
    return (
        <section className="h-screen bg-gray-200">
                <div className="mx-auto px-4 sm:px-6 lg:px8">
                    <div className="mx-auto mt-8 max-w-screen-xl px-4 lg:px8">
                        <div className="bg-white shadow-xl rounded-xl">
                            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                                <h1 className="font-bold text-lg">You don't have access to this page.</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}