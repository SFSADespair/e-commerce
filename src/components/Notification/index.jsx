import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Notification() {
    return(
        <ToastContainer 
            position="top-right"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={true}
            closeButton
            pauseOnFocusLoss
            pauseOnHover
            draggable
            theme="light"
            rtl={false}
        />
    )
}