'use client'

import { loginFromControls } from "@/utils"
import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { login } from "@/services/login"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { toast } from "react-toastify"

const styles = {
    button: `disabled:opacity-50 inline-flex w-full items-center justify-center bg-black 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}

const initForm = {
    email: '',
    password: ''
}

export default function Login() {
    const router = useRouter()
    const [formData, setFormData] = useState(initForm)
    const {commonLoader, setCommonLoader} = useContext(GlobalContext)
    
    const isValid = () => {
        return formData && formData.email && formData.email.trim() !== '' 
            && formData.password && formData.password.trim() !== '' 
                ? true : false
    }

    const handleLogin = async () => {
        const res = await login(formData)
        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setCommonLoader(true)
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setCommonLoader(false)
            setFormData(initForm)
        }
            
    }

    return (
        <>
            <div className="bg-white relative">
                <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                    <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                        <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                                <p className="w-full text-4xl font-medium text-center font-serif">
                                   Login
                                </p>
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {
                                        loginFromControls.map(controlItem => 
                                            controlItem.componnentType === 'input' ? (
                                                <InputComponent 
                                                    key={controlItem.id}
                                                    type={controlItem.type}
                                                    placeholder={controlItem.placeholder}
                                                    label={controlItem.label} 
                                                    value={formData[controlItem.id]}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        [controlItem.id]: e.target.value
                                                    })}
                                                />
                                            ) : null    
                                        )
                                    }
                                    <button 
                                        className={styles.button}
                                        disabled={!isValid()}
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                    <div className="flex flex-col gap-2">
                                        <p>New to website ?</p>
                                        <button className={styles.button}
                                            onClick={() => router.push('/register')}
                                        >
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Notification />
            </div>
        </>
    )
}