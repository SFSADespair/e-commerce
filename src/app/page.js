'use client'

import { GlobalContext } from "@/context"
import { useContext, useEffect } from "react"

export default function Home() {
  const { isAuth, user } = useContext(GlobalContext)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>E Commerce Website</h1>
    </main>
  )
}
