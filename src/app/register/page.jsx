'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import ComponentLevelLoader from "@/components/Loader/componentlevel"
import Notification from "@/components/Notification"
import { GlobalContext } from "@/context"
import { registerNewUser } from "@/services/register"
import { registrationFormControls } from "@/utils"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { toast } from "react-toastify"

const styles = {
    button: `disabled:opacity-50 inline-flex w-full items-center justify-center bg-black 
            px-6 py-4 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}

const initForm = {
    name: '',
    email: '',
    password: '',
    role: 'customer'
}

export default function Register() {
    const [formData, setFormData] = useState(initForm)
    const [isRegistered, setIsRegistered] = useState(false)
    const {commonLoader, setCommonLoader} = useContext(GlobalContext)

    const router = useRouter()

    //Form Validation
    const isFormValid = () => {
        return formData && formData.name && formData.name.trim() !== ''
            && formData.email && formData.email.trim() !== ''
            && formData.password && formData.password.trim() !== ''
            ? true
            : false
    }

    const handleRegister = async () => {
        setCommonLoader(true)
        const data = await registerNewUser(formData)
        if (data.success) {
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setIsRegistered(true)
            setCommonLoader(false)
            setFormData(initForm)
        } else {
            toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            setCommonLoader(false)
            setFormData(initForm)
        }

        console.log(data);
    }
    
    return (
        <div className="bg-white relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                {
                                    isRegistered ? "Registration Successful" : "Sign Up for an account"
                                }
                            </p>
                            {
                                isRegistered ? (
                                    <button 
                                        className={styles.button}
                                        onClick={() => router.push('/login')}
                                    >
                                        Login
                                    </button>
                                ) : (
                                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                        {
                                            registrationFormControls.map(controlItem => 
                                                controlItem.componnentType === 'input' ? (
                                                    <InputComponent 
                                                        key={controlItem.id}
                                                        type={controlItem.type}
                                                        placeholder={controlItem.placeholder}
                                                        label={controlItem.label} 
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                [controlItem.id]: e.target.value
                                                            })
                                                        }}
                                                        value={formData[controlItem.id]}
                                                    />
                                                ) :
                                                controlItem.componnentType === 'select' ? (
                                                    <SelectComponent 
                                                        key={controlItem.id}
                                                        options={controlItem.options}
                                                        label={controlItem.label}
                                                        onChange={(e) => {
                                                            setFormData({
                                                                ...formData,
                                                                [controlItem.id]: e.target.value
                                                            })
                                                        }}
                                                        value={formData[controlItem.id]}
                                                    />
                                                ) : null    
                                            )
                                        }
                                        <button className={styles.button}
                                            disabled={!isFormValid()}
                                            onClick={handleRegister}
                                        >
                                            {
                                                commonLoader ? 
                                                    <ComponentLevelLoader 
                                                        text={'Registering'}
                                                        color={'#fff'}
                                                        loading={commonLoader}

                                                    /> : 'Register'
                                            }
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}
