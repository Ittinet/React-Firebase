import { addDoc, collection, doc, serverTimestamp, getDoc, onSnapshot, getDocs, deleteDoc, limit, query, orderBy } from "firebase/firestore"
import { db, storageimg } from "../config/firebase"
import { toast } from "react-toastify"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"




export const createCategory = async (form) => {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, orderBy('createAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        let newId = 'CT001'; // ค่าเริ่มต้นสำหรับ category ใหม่

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0];
            const lastId = lastDoc.data().category_id; // ดึง `id` จากเอกสารล่าสุด CT001
            // ตรวจสอบว่ารูปแบบของ `lastId` ถูกต้องหรือไม่
            if (lastId.startsWith('CT') && !isNaN(parseInt(lastId.slice(2), 10))) {
                const numericPart = parseInt(lastId.slice(2), 10); //นำ CT001 มาตัดคำสองตัวแรกออกจะได้ 001 และแปลงเป็นเลขฐาน 10 อีก จะได้ 1
                newId = `CT${(numericPart + 1).toString().padStart(3, '0')}`;   //นำตัวเลขที่แปลงแล้วมา +1 แปลงเป็น String และใช้ padStart เพิ่ม 0 ข้างหน้าให้ครบ 3 ตำแหน่ง
            } else {
                console.log('Invalid last ID format');
            }
        }

        const docRef = await addDoc(collection(db, 'categories'), {
            category_id: newId,
            category_name: form.name,
            category_images: form.images,
            createAt: serverTimestamp(),
        })
        const docSnapshot = await getDoc(docRef)

        if (docSnapshot.exists()) {
            toast.success(`Add ${docSnapshot.data().category_name} Complete!`)
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

export const DeleteCategory = async (data) => {
    try {
        const docSnapshot = await getDoc(doc(db, 'categories', data.docid))
        if (!docSnapshot.exists()) {
            console.log('Document does not exist');
            return; // ออกจากฟังก์ชันหากเอกสารไม่พบ
        }
        await deleteDoc(doc(db, 'categories', data.docid));

        if (data.category_images.length > 0 && data.category_images[0] && data.category_images[0].fileref) {
            const fileref = ref(storageimg, data.category_images[0].fileref);
            await deleteObject(fileref);
        }

        toast.success(`Remove ${docSnapshot.data().category_name} Success!`)
    } catch (error) {
        console.log(error.message)
    }
}

export const uploadFiles = async (file) => {
    try {
        const path = '/test/categories/' + file.name
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
        await deleteObject(fileRef)
        return toast.success('ลบรูปสำเร็จ')
    } catch (error) {
        console.log('Error delete file', error.response.data)
    }
}