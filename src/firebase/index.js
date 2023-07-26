import { firebaseApp } from "@/firebase/firebaseConfig"
import { firebaseStorageUrl } from "@/utils"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const app = firebaseApp
const storage = getStorage(app, firebaseStorageUrl)

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 12)

    return `${getFile.name}-${timeStamp}-${randomString}`
}

export const helperUploadImage = async(file) => {
    const fileName = createUniqueFileName(file)
    const storageRef = ref(storage, `ecommerce/${fileName}`)
    const uploadImage = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapshot)=> {}, (error)=>{
            console.log(error);
            reject(error)
        }, ()=>{
            getDownloadURL(uploadImage.snapshot.ref)
                .then(downloadUrl => resolve(downloadUrl))
                .catch(error => reject(error))
        })
    })
}