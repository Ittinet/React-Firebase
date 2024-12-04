import { addDoc, collection, doc, serverTimestamp, setDoc, getDoc, onSnapshot, getDocs, deleteDoc } from "firebase/firestore"
import { db, storageimg } from "../config/firebase"
import { toast } from "react-toastify"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"




export const createCategory = async (form) => {
    try {
        const docRef = await addDoc(collection(db, 'categories'), {
            name: form.name,
            images: form.images,
            createAt: serverTimestamp()
        })
        const docSnapshot = await getDoc(docRef)

        if (docSnapshot.exists()) {
            toast.success(`Add ${docSnapshot.data().name} Complete!`)
            return docSnapshot.data();
        } else {
            toast.error('Document Not Found!')
            console.log('Document Not Found!')
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const getCategory = (callback) => {
    try {
        const unsubscribe = onSnapshot(collection(db, 'categories'), (querySnapshot) => {
            const dataList = querySnapshot.docs.map((doc) => ({
                docid: doc.id,
                ...doc.data()
            }));
            callback(dataList)
        });

        return unsubscribe;
    } catch (error) {
        console.log(error.message)
    }
}

export const DeleteCategory = async (docId) => {
    try {
        const docSnapshot = await getDoc(doc(db, 'categories', docId))
        if (!docSnapshot.exists()) {
            console.log('document exists')
        }
        await deleteDoc(doc(db, 'categories', docId));
        toast.success(`Remove ${docSnapshot.data().name} Success!`)
    } catch (error) {
        console.log(error.message)
    }
}

export const uploadFiles = async (file) => {
    try {
        const path = 'files/' + file.name
        const fileref = ref(storageimg, path)

        const snapshot = await uploadBytes(fileref, file)
        const imgurl = await getDownloadURL(fileref);
        const data = {
            fileref: path,
            imageurl: imgurl
        }
        console.log('File upload complete', snapshot)
        return data

    } catch (error) {
        console.log('Error uploading file', error)
    }
}

export const deleteFiles = async (filerefimg) => {
    try {
        const fileRef = ref(storageimg, filerefimg)
        console.log('path', fileRef)
        await deleteObject(fileRef)
        return toast.success('ลบรูปสำเร็จ')
    } catch (error) {
        console.log('Error delete file', error.response.data)
    }
}