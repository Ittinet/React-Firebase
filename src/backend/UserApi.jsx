import { addDoc, collection, count, deleteDoc, doc, getDoc, getDocs, increment, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { toast } from "react-toastify"



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
                totalPrice: parseInt(product.product_price),
                createAt: serverTimestamp()
            })
        }

        const cartsnapshot = await getDocs(CartItemRef)
        let totalprice = 0
        cartsnapshot.docs.forEach(doc => {
            const product = doc.data()
            totalprice += Number(product.product_price) * Number(product.count)

        })

        await setDoc(CartUserRef, {
            total_price: totalprice,
            orderby: userid,
            updateAt: serverTimestamp()
        })
        console.log(totalprice)

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
            console.log('ลบ product on cart เรียบร้อย')
            return {
                message: 'ลบสินค้าสำเร็จ'
            }

        }
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
                totalPrice: newTotalPrice,
                updateAt: serverTimestamp()
            })

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