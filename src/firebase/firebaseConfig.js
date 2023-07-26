import { firebaseConfig } from "@/utils"
import { initializeApp } from "firebase/app"

const fConfig = firebaseConfig

export const firebaseApp = initializeApp(fConfig)