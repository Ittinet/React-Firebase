import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { toast } from "react-toastify"

export const calculateCart = async (userid) => {
    try {
        const CartUserRef = doc(db, 'usercarts', userid)
        const CartItemRef = collection(CartUserRef, "carts")
        const cartsnapshot = await getDocs(CartItemRef)
        if (!cartsnapshot.empty) {
            let totalprice = 0
            cartsnapshot.docs.forEach(doc => {
                const product = doc.data()
                totalprice += Number(product.product_price) * Number(product.count)
            })

            await setDoc(CartUserRef, {
                total_price: totalprice,
                orderby: userid,
                updataAt: serverTimestamp()
            })
        } else {
            await setDoc(CartUserRef, {})
            console.log('error calculateCart Api')
        }

    } catch (error) {
        console.error(error)
    }

}

export const addProductCart = async (product, userid) => {
    try {
        const CartUserRef = doc(db, 'usercarts', userid)
        const CartItemRef = collection(CartUserRef, "carts")
        const q = query(CartItemRef, where("product_id", "==", product.product_id))
        const querysnapshot = await getDocs(q)
        if (!querysnapshot.empty) {
            const message = 'มีสินค้านี้ในตระกร้าอยู่แล้ว'
            console.log(message)
            return {
                message: message
            }
        } else {
            await addDoc(CartItemRef, {
                ...product,
                count: 1,
                total_price: parseInt(product.product_price),
                createAt: serverTimestamp()
            })
        }
        await calculateCart(userid)
        console.log('Complete to add cart')
    } catch (error) {
        console.error(error)
    }
}

export const deleteProductOnCart = async (docid, userid) => {
    try {
        if (!docid) {
            toast.error('ไม่พบข้อมูลหรือข้อมูลนี้อาจถูกลบไปแล้ว')
            return;
        } else {
            const productRef = doc(db, 'usercarts', userid, 'carts', docid);
            await deleteDoc(productRef)
        }
        await calculateCart(userid)

    } catch (error) {
        console.error(error)
    }
}

export const updateProcutOnCart = async (docdata, condition, userid) => {
    try {
        const cartref = doc(db, "usercarts", userid, "carts", docdata.docid)
        const docSnapshot = await getDoc(cartref)

        if (docSnapshot.exists) {
            let newCount = condition === 'increase' ? docdata.count + 1 : docdata.count - 1;  // ใช้ docdata.count ในการคำนวณ
            if (newCount < 1) {
                newCount = 1
            }
            const newTotalPrice = docdata.product_price * newCount;  // คำนวณ totalPrice ใหม่
            await updateDoc(cartref, {
                count: newCount,
                total_price: newTotalPrice,
                updateAt: serverTimestamp()
            })
            await calculateCart(userid)
            return {
                message: 'อัพเดทข้อมูลสำเร็จ'
            }

        } else {
            return {
                message: 'ไม่พบข้อมูลสินค้านี้หรืออาจถูกลบไปแล้ว'
            }
        }


    } catch (error) {
        console.error(error)
    }
}

export const getTotalPrice = async (userid) => {
    try {
        const q = doc(db, "usercarts", userid)
        const querysnapshot = await getDoc(q)
        if (querysnapshot.exists) {
            const data = querysnapshot.data()
            if (data) {
                return {
                    data: data
                }
            }
        } else {
            console.log('ไม่พบตระกร้า')
            return
        }
    } catch (error) {
        console.error(error)
    }
}

export const addAddress = async (form, userid) => {
    try {
        if (!userid) {
            return {
                message: 'Not Found User'
            }
        }
        if (!form.firstname ||
            !form.lastname ||
            !form.phone ||
            !form.address ||
            !form.province ||
            !form.district ||
            !form.subdistrict ||
            !form.postcode) {
            return {
                status: 'cancle',
                message: 'Please enter complete information.'
            }
        }
        const ref = doc(db, 'useraddress', userid)
        await setDoc(ref, {
            ...form,
            uid: userid,
            updateAt: serverTimestamp()
        })
        return {
            status: 'ok',
            message: 'อัพเดทสำเร็จ'
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAddress = async (userid) => {
    try {
        if (!userid) {
            console.log('Not Found Address')
            return
        }
        const ref = doc(db, 'useraddress', userid)
        const docsnap = await getDoc(ref)
        if (docsnap.exists) {
            return docsnap.data()
        } else {
            return 'Not found Data'
        }
    } catch (error) {
        console.error(error)
    }
}