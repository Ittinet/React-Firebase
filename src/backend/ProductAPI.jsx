import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { db, storageimg } from "../config/firebase"
import { toast } from "react-toastify"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 as uuidv4 } from 'uuid';


export const createProduct = async (form) => {
    try {
        const categoryref = collection(db, 'categories')
        const q = query(categoryref, where("category_id", "==", form.category_id))
        const categoryDoc = await getDocs(q)
        if (categoryDoc.empty) {
            console.error('ไม่พบข้อมูล category_id', form.category_id)
            return;
        }
        const categoryData = categoryDoc.docs.map((doc) => ({
            doc_id: doc.id,
            ...doc.data()
        }))

        if (categoryData.length != 1) {
            console.error('พบข้อมูล category มากกว่าหนึ่งหลายการ')
            return;
        }

        const productsRef = collection(db, 'products');
        const productsQuery = query(productsRef, orderBy('createAt', 'desc'), limit(1))
        const productsSnapshot = await getDocs(productsQuery)
        let newId = 'PD0001'

        if (!productsSnapshot.empty) {
            const lastDoc = productsSnapshot.docs[0];
            const lastId = lastDoc.data().product_id; // ดึง `id` จากเอกสารล่าสุด CT001

            // ตรวจสอบว่ารูปแบบของ `lastId` ถูกต้องหรือไม่
            if (lastId.startsWith('PD') && !isNaN(parseInt(lastId.slice(2), 10))) {
                const numericPart = parseInt(lastId.slice(2), 10); //นำ PD0001 มาตัดคำสองตัวแรกออกจะได้ 0001 และแปลงเป็นเลขฐาน 10 อีก จะได้ 1
                newId = `PD${(numericPart + 1).toString().padStart(4, '0')}`; //นำตัวเลขที่แปลงแล้วมา +1 แปลงเป็น String และใช้ padStart เพิ่ม 0 ข้างหน้าให้ครบ 4 ตำแหน่ง
            } else {
                console.log('Gen Product_id missing')
            }
        }

        const createProductRef = await addDoc(collection(db, 'products'), {
            category_id: form.category_id,
            category_name: categoryData[0]?.category_name,
            product_id: newId,
            product_name: form.product_name,
            product_price: parseInt(form.product_price),
            product_gender: form.product_gender,
            product_size: form.product_size,
            product_color: form.product_color,
            product_description: form.product_description,
            product_stock: parseInt(form.product_stock),
            product_images: form.product_images,
            product_sold: parseInt(0),
            createAt: serverTimestamp(),
            updateAt: serverTimestamp()
        })
        const resultsSnapshot = await getDoc(createProductRef)
        const result = resultsSnapshot.data()
        toast.success(`เพิ่มข้อมูลสินค้า ${result.product_name} สำเร็จ`)
        return result

    } catch (error) {
        console.error(error.message)
        console.error(error.stack);
    }
}

export const getProducts = (callback) => {
    try {
        const q = query(
            collection(db, 'products'),
            orderBy('product_name') // ใช้ orderBy ตามฟิลด์ที่คุณต้องการ เช่น "price"
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                docid: doc.id,
                ...doc.data()
            }))
            callback(data)
        })
        return unsubscribe
    } catch (error) {
        console.log(error.message)
    }
}

export const DeleteProduct = async (data) => {
    try {
        if (!data) {
            toast.error('ไม่พบข้อมูลหรือข้อมูลนี้อาจถูกลบไปแล้ว')
            return;
        }

        if (data.product_images && data.product_images.length != 0) {
            for (const item of data.product_images) {
                try {
                    const imgRef = ref(storageimg, item.fileref)
                    await deleteObject(imgRef)
                } catch (error) {
                    if (error.code === 'storage/object-not-found') {
                        console.warn(`Image ${item.fileref} not found. It may have already been deleted.`);
                        // ดำเนินการลูปต่อไปโดยไม่โยนข้อผิดพลาดออก
                    } else {
                        throw error; // หากข้อผิดพลาดไม่ใช่ object-not-found ให้โยนข้อผิดพลาดออกจากลูป
                    }
                }
            }
        }

        await deleteDoc(doc(db, 'products', data.docid))

        toast.success(`ลบสินค้า ${data.product_id} ${data.product_name} สำเร็จ!`)
        console.log(data)
    } catch (error) {
        console.error(error)
    }

}

export const uploadFileProduct = async (file) => {
    try {
        const fileName = uuidv4() + '.' + file.name.split('.').pop();
        const path = '/test/products/' + fileName
        const fileRef = ref(storageimg, path)
        const snapshot = await uploadBytes(fileRef, file)
        const imgURL = await getDownloadURL(fileRef)

        const data = {
            fileref: path,
            imageurl: imgURL
        }
        console.log('File upload complete', snapshot)
        return data
    } catch (error) {
        console.error(error)
    }

}

export const deleteFileProduct = async (data) => {
    try {
        const fileRef = ref(storageimg, data.fileref)
        if (!data) {
            toast.error('ไม่มีไฟล์นี้หรือไฟล์นี้ถูกลบไปแล้ว')
            return
        }
        await deleteObject(fileRef)
        toast.success('ลบรูปภาพสำเร็จ', {
            autoClose: 2000
        })
    } catch (error) {
        console.error(error)
        toast.error('เกิดข้อผิดพลาดบางอย่าง')
    }


}


export const readProduct = async (id) => {
    try {
        let paramCheck = true
        const q = query(collection(db, 'products'), where("product_id", "==", id))
        const querysnapshot = await getDocs(q)
        let response = {}

        if (querysnapshot.empty) {
            paramCheck = false
            response = {
                paramCheck: paramCheck
            }
            return response
        }

        const ProductData = querysnapshot.docs.map((doc) => ({
            docid: doc.id,
            ...doc.data()
        }))
        response = {
            ProductData: ProductData,
            paramCheck: paramCheck
        }
        return response
    } catch (error) {
        console.error(error)
    }
}

export const editProduct = async (form) => {
    try {
        const q = query(collection(db, 'products'), where('product_id', '==', form.product_id))
        const querysnapshot = await getDocs(q)
        const qCategory = query(collection(db, 'categories'), where('category_id', '==', form.category_id))
        const queryCategory = await getDocs(qCategory)
        let categoryName = null

        if (queryCategory.empty) {
            toast.error('เกิดข้อผิดพลาดเกี่ยวกับหมวดหมู่สินค้า')
            return
        }

        for (const docCategory of queryCategory.docs) {
            categoryName = docCategory.data().category_name
        }

        if (!querysnapshot.empty) {
            for (const doc of querysnapshot.docs) {
                await updateDoc(doc.ref, {
                    ...form,
                    updateAt: serverTimestamp(),
                    category_name: categoryName,
                    product_price: parseInt(form.product_price),
                    product_stock: parseInt(form.product_stock),
                    product_sold: parseInt(form.product_sold)
                })
            }
            toast.success('อัพเดทข้อมูลสำเร็จ!')
            return {
                ...form,
                updateAt: serverTimestamp(),
                category_name: categoryName
            }
        } else {
            console.log('No matching documents found')
        }
    } catch (error) {
        console.error(error)
    }

}

export const filterProduct = async ({ genders, size, searchtext, searchcategories, searchColor, price }) => {
    try {
        let Data = []
        let q = query(collection(db, 'products'))
        if (genders && genders.length > 0) {
            q = query(q, where("product_gender", "in", genders))

        }
        if (size && size.length > 0) {
            q = query(q, where("product_size", "in", size))

        }
        if (searchcategories) {
            q = query(
                q,
                where("category_name", "==", searchcategories),
            )
        }
        if (searchColor && searchColor.length > 0) {
            q = query(
                q,
                where("product_color", "in", searchColor)
            )
        }

        // q = query(q, orderBy("product_price", "asc"));

        const querysnapshot = await getDocs(q)

        for (const doc of querysnapshot.docs) {
            const product = doc.data();
            if (searchtext || price.length === 2) {
                if (searchtext) {
                    if (product.product_name.toLowerCase().includes(searchtext.toLowerCase())) {
                        Data.push(product);
                    }
                }
                if (price.length === 2) {
                    if (product.product_price >= price[0] && product.product_price <= price[1]) {
                        Data.push(product);
                    }
                }
            } else {
                Data.push(product)
            }
        }


        return Data
    } catch (error) {
        console.error(error);
        return [];
    }
};



