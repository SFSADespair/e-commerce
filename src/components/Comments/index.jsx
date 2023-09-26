'use client'

import { getComments } from "@/services/comments"
import { useEffect, useState } from "react"

{/* User Comments */}

export default function Comments() {
    const [comments, setComments] = useState([])
    const [count, setCount] = useState(0)

    // HandleComments function will take in a the productID to get the comments for a product
    const handleComments = async() => {
        const cmts = await getComments()
        setComments(cmts);
    }

    //Every 10hours refresh the comments
    useEffect(() => {
        handleComments()
        const timer = setTimeout(() => {
            const counter = count + 1
            setCount(counter)
        }, 1000)
        
        if (count === 360000) {
            setCount(0)
            handleComments()
            return () => clearTimeout(timer)
        }    
    }, [count])

    return (
        <>
            <div className="flex flex-col">
                {/* Heading */}
                <div className="flex-col">
                    <h1 className="text-lg font-bold text-gray-600">User reviews</h1>
                </div>
                {/* Content */}
                {
                    comments && comments.length ? (
                        comments.map((comment, i) => (
                            <div key={i} className="mt-8 ml-2 border-b border-gray-300">
                                {/* User name */}
                                <h4 className="text-md font-semibold text-gray-500">{comment.username}</h4>
                                {/* Comment and rating */}
                                <div className="mt-4 pl-4 mb-6 flex flex-row justify-between">
                                    <p className="">{comment.review}</p>
                                    <p>Rating: {comment.rating}</p>
                                </div> 
                                {/* Date uploaded */}
                                <p className="text-sm text-gray-400 mb-4">Date: {comment.Date}</p>
                            </div>
                        ))
                    ) : <p>No Reviews yet</p>
                }
            </div>
        </>
    )
}
