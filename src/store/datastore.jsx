import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { authdb, db } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from "firebase/firestore";

const dataStore = (set, get) => ({
    carts: null,
    getOrderUser: async () => {
        try {
            const { user } = get()
            const q = query(collection(db, "orders"), where("uid", "==", user.uid))
            const querysnapshot = await getDocs(q)
            if (!querysnapshot.empty) {
                const orderData = querysnapshot.docs.map((doc) => ({
                    docid: doc.id,
                    ...doc.data()
                }))
                console.log(orderData)
            } else {
                console.log('noOrder')
            }
        } catch (error) {
            console.error(error)
        }
    },
    getCartUser: (userid) => {
        try {
            const usercheck = userid
            if (!usercheck) {
                console.log('User is not authenticated.')
                return
            }
            const unsubscribe = onSnapshot(
                collection(db, 'usercarts', usercheck, 'carts'),
                (snapshot) => {
                    const carts = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        docid: doc.id
                    }));
                    set({ carts })
                },
                (error) => {
                    console.error("Error fetching cart data:", error)
                }
            );
            // console.log('getcartuser')

            return unsubscribe
        } catch (error) {
            console.error(error)
        }
    }


})






const usedataStore = create(dataStore)

export default usedataStore
